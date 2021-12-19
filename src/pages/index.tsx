import type { NextPage } from 'next'
import type { PostResponse } from '@/types'
import useSWR from 'swr'
import { Header } from '@/components/shared/Header'
import { UserModal } from '@/components/shared/UserModal'
import { useCertification } from '@/hooks/useCertification'
import { useRecoilValue, useRecoilState } from 'recoil'
import { userState, loadState } from '@/atoms/states'
import { Spinner, Center } from '@chakra-ui/react'

const Home: NextPage = () => {
  const userInfo = useRecoilValue(userState)
  const [isLoading, setLoading] = useRecoilState(loadState)
  const { data, error } = useSWR<PostResponse[], Error>('/api/v1/post', fetcher)
  const { showSignInModal, showSignUpModal, isUserModalOpen, onUserModalClose, mode } = useCertification()

  if (error) return <p>Error: {error.message}</p>
  data ? setLoading(false) : setLoading(true)
  return (
    <div>
      <Header isSignIn={userInfo.isSignIn} showSignInModal={showSignInModal} showSignUpModal={showSignUpModal} />
      <UserModal isOpen={isUserModalOpen} onClose={onUserModalClose} mode={mode} />
      {isLoading && (
        <Center h="100vh" bg="rgba(0, 0, 0, .3)">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      )}
    </div>
  )
}

export default Home
const fetcher = async (url: string) => {
  const response = await fetch(url)
  const json = await response.json()
  return json
}
