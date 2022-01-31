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
import { useDisclosure, Flex, Text, Box } from '@chakra-ui/react'
import { API } from '@/utils/AppUtils'
import { useEffect, useState } from 'react'
import { Card } from '../components/shared/Card'
import { StoreList } from '../components/layout/StoreList'

const Home: NextPage = () => {
  const userInfo = useRecoilValue(userState)
  const isLoading = useRecoilValue(loadState)
  const [posts, setPosts] = useState<PostResponse[]>([])
  const [showPosts, setShowPosts] = useState<PostResponse[]>([])
  const { fetchData } = useRequest()
  const params = new PostResponse()

  const { showSignInModal, showSignUpModal, isUserModalOpen, onUserModalClose, mode } = useCertification()
  const { onClose, isOpen, onOpen: showPostModal } = useDisclosure()
  const fetchPosts = async () => {
    const posts = await fetchData(API.GetPosts)
    setPosts(posts)
    setShowPosts(posts)
  }
  useEffect(() => {
    fetchPosts()
  }, [])

  const selectStore = (storeCode: string) => {
    if (!storeCode) {
      setShowPosts(posts)
      return
    }
    const selectedStore = posts.filter((post) => post.storeCode === storeCode)
    setShowPosts(selectedStore)
  }

  return (
    <Box>
      <Header
        isSignIn={userInfo.isSignIn}
        showSignInModal={showSignInModal}
        showSignUpModal={showSignUpModal}
        showPostModal={showPostModal}
      />
      <Flex w="100%" pt="60px">
        <StoreList selectStore={selectStore} />
        <Flex ml="250px" wrap="wrap">
          {showPosts.length ? (
            showPosts.map((post, i) => <Card fetchPosts={fetchPosts} key={i} post={post} />)
          ) : (
            <Text mt={6} fontSize="large">
              投稿がありません
            </Text>
          )}
        </Flex>
      </Flex>
      <UserModal isOpen={isUserModalOpen} onClose={onUserModalClose} mode={mode} />
      <PostModal params={params} isOpen={isOpen} onClose={onClose} fetchPosts={fetchPosts} />
      {isLoading && <Loading isSignIn={userInfo.isSignIn} />}
    </Box>
  )
}

export default Home
