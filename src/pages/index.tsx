import type { NextPage } from 'next'
import type { PostResponse } from '@/types'
import useSWR from 'swr'
import { Header } from '@/components/shared/Header'
import { UserModal } from '@/components/shared/UserModal'
import { useCertification } from '@/hooks/useCertification'
import { useRecoilValue } from 'recoil'
import { userState, loadState } from '@/atoms/states'
import Loading from './Loading'

const Home: NextPage = () => {
  const userInfo = useRecoilValue(userState)
  const isLoading = useRecoilValue(loadState)
  const { data, error } = useSWR<PostResponse[], Error>('/api/v1/post', fetcher)
  const { showSignInModal, showSignUpModal, isUserModalOpen, onUserModalClose, mode } = useCertification()

  if (error) return <p>Error: {error.message}</p>
  if (!data) return <Loading isSignIn={false} />

  return (
    <div>
      <Header isSignIn={userInfo.isSignIn} showSignInModal={showSignInModal} showSignUpModal={showSignUpModal} />
      <UserModal isOpen={isUserModalOpen} onClose={onUserModalClose} mode={mode} />
      {isLoading && <Loading isSignIn={userInfo.isSignIn} />}
    </div>
  )
}

export default Home
const fetcher = async (url: string) => {
  const response = await fetch(url)
  const json = await response.json()
  return json
}
