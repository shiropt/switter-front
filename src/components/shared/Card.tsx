import type { MouseEventHandler, SyntheticEvent, VFC } from 'react'
import { useState } from 'react'
import { Box, Heading, Image, Text, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import type { PostResponse } from '@/types'
import { useFormatter } from '../../hooks/useFormatter'
import { DetailModal } from './DetailModal'
import { CgMenuGridO } from 'react-icons/cg'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { IconContext } from 'react-icons'
import { useRequest } from '@/hooks/useRequest'
import { API } from '../../utils/AppUtils'
import { ConfirmModal } from './ComfirmModal'
import { userState } from '@/atoms/states'
import { useRecoilState } from 'recoil'

type CardProps = {
  post: PostResponse
  fetchPosts: VoidFunction
}

export const Card: VFC<CardProps> = (props) => {
  const { deleteRequest, replaceByUrl } = useRequest()
  const { post } = props
  const { splitContent, formatDate } = useFormatter()
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [userInfo, setUser] = useRecoilState(userState)
  const [alertMessage, setAlertMessage] = useState('')
  const showPostMenu = (event: SyntheticEvent) => {
    event.stopPropagation()
  }
  const updatePost = (event: SyntheticEvent) => {
    event.stopPropagation()
  }
  const deleteClick = async (event: SyntheticEvent) => {
    event.stopPropagation()
    setAlertMessage(`削除`)
    setIsConfirmModalOpen(true)
  }
  const deletePost = async () => {
    const path = replaceByUrl(API.DeletePost, post.id.toString())
    await deleteRequest(path, '削除')
    setIsConfirmModalOpen(false)
    props.fetchPosts()
  }

  return (
    <Box
      p="2px"
      m={1}
      pr={4}
      pl={4}
      pt={5}
      _hover={{ bg: '#F5F5F5', cursor: 'pointer' }}
      onClick={() => setIsDetailModalOpen(true)}
    >
      <Heading as="h4" size="md">
        {splitContent(post.title, 12)}
      </Heading>
      <Flex justifyContent="space-between">
        <Text>{splitContent(post.contents, 14) || <Text visibility="hidden">hidden</Text>}</Text>
        {post.userId === userInfo.id ? (
          <Menu>
            <MenuButton onClick={showPostMenu} _hover={{ opacity: 0.5 }}>
              <IconContext.Provider value={{ size: '30px', color: 'gray' }}>
                <CgMenuGridO />
              </IconContext.Provider>
            </MenuButton>
            <MenuList w={2} minWidth="120px">
              <MenuItem onClick={updatePost}>
                <FiEdit />
                <Text ml={2}>編集</Text>
              </MenuItem>
              <MenuItem onClick={deleteClick}>
                <FiTrash2 />
                <Text ml={2}>削除</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        ) : null}
      </Flex>
      <Image
        loading="lazy"
        width="270px"
        height="200px"
        src={`${post.image}/200/300`}
        fallbackSrc="https://via.placeholder.com/150"
        alt="投稿画像"
      />
      <Text float="right" mr={2} color="gray.500">
        {formatDate(post.updatedAt)}
      </Text>
      <DetailModal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} post={post} />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        okCallBack={deletePost}
        message={alertMessage}
      />
    </Box>
  )
}
