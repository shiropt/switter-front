import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { userId } = router.query

  return <div>user id: {userId}</div>
}

export default Post
