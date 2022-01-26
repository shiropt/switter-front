import type { NextPage } from 'next'
import { PostResponse } from '@/types'
import { Header } from '@/components/shared/Header'
import { UserModal } from '@/components/shared/UserModal'
import { useCertification } from '@/hooks/useCertification'
import { useRequest } from '@/hooks/useRequest'
import { useRecoilValue } from 'recoil'
import { userState, loadState } from '@/atoms/states'
import Loading from './Loading'
import { PostModal } from '@/components/model/PostModal'
import { useDisclosure } from '@chakra-ui/react'
import { API } from '@/utils/AppUtils'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const userInfo = useRecoilValue(userState)
  const isLoading = useRecoilValue(loadState)
  const [posts, setPosts] = useState<PostResponse[]>([])
  const { fetchData } = useRequest()
  const params = new PostResponse()

  const { showSignInModal, showSignUpModal, isUserModalOpen, onUserModalClose, mode } = useCertification()
  const { onClose, isOpen, onOpen: showPostModal } = useDisclosure()

  useEffect(() => {
    const fetch = async () => {
      const posts = await fetchData(API.GetPosts)
      setPosts(posts)
      console.log(posts)
    }
    fetch()
  }, [])

  return (
    <div>
      <Header
        isSignIn={userInfo.isSignIn}
        showSignInModal={showSignInModal}
        showSignUpModal={showSignUpModal}
        showPostModal={showPostModal}
      />
      <UserModal isOpen={isUserModalOpen} onClose={onUserModalClose} mode={mode} />
      <PostModal params={params} isOpen={isOpen} onClose={onClose} />
      {isLoading && <Loading isSignIn={userInfo.isSignIn} />}
    </div>
  )
}

export default Home
