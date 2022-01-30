import type { VFC } from 'react'
import { Box, Heading, Flex, Image, Text, Link } from '@chakra-ui/react'
import type { PostResponse } from '@/types'
import { useFormatter } from '../../hooks/useFormatter'

type CardProps = {
  post: PostResponse
}

export const Card: VFC<CardProps> = ({ post }) => {
  const { splitContent, formatDate } = useFormatter()
  return (
    <Box w={280} m={15} pr={4} pl={4} pt={6}>
      <Heading as="h4" size="md">
        {post.title}
      </Heading>
      <Text>{splitContent(post.contents, 14)}</Text>
      <Image src={`${post.image}300/200`} alt="投稿画像" />
      <Flex justifyContent="space-between">
        <Link color="blue">もっと見る</Link>
        <Text>{formatDate(post.updatedAt)}</Text>
      </Flex>
    </Box>
  )
}
