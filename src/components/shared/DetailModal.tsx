import type { VFC } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Image, Flex, Spacer, Box, Text } from '@chakra-ui/react'
import type { PostResponse } from '@/types'
import { ModalBase } from '../layout/ModalBase'
import { ImageUrl, stores } from '@/utils/AppUtils'
import ReactStars from 'react-stars'
import { useFormatter } from '../../hooks/useFormatter'

type UserModalProps = {
  isOpen: boolean
  onClose: VoidFunction
  post: PostResponse
}

export const DetailModal: VFC<UserModalProps> = ({ ...props }) => {
  const { post } = props
  const date = new Date().getTime()

  const [storeName, setStoreName] = useState('')
  const { formatDate } = useFormatter()
  useEffect(() => {
    const store = stores.find((store) => store.code === post.storeCode)
    if (store) {
      setStoreName(store.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen])

  return (
    <ModalBase title={post.title} {...props} height={490} width={600}>
      <Flex>
        <Text fontWeight="bold">おすすめ度：</Text>
        <Box mt={-1.5}>
          <ReactStars edit={false} count={5} value={post.star} size={25} color2={'#ffd700'} />
        </Box>
        <Spacer />
        <Text>{storeName}</Text>
        <Text ml={2}>{post.price ? `${post.price}円` : null}</Text>
      </Flex>
      <Text>{post.contents}</Text>
      <Image
        src={post.image ? `${ImageUrl.post}${post.id}.${post.image}?${date}` : `${ImageUrl.noImage}`}
        objectFit="cover"
        height="300px"
        minWidth="400px"
        alt="投稿画像"
        m="0 auto"
      />

      <Text float="right" mr={2} color="gray.500">
        {formatDate(post.updatedAt)}
      </Text>
    </ModalBase>
  )
}
