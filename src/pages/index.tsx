import type { NextPage } from 'next'
import type { PostResponse } from '@/types'
import useSWR from 'swr'
import { AppButton } from '@/components/shared/AppButton'

const Home: NextPage = () => {
  const { data, error } = useSWR<PostResponse[], Error>('/api/v1/post', fetcher)
  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>Loading...</p>
  console.log(data)
  const onClick = () => {
    console.log('click')
  }
  return (
    <div>
      {data[0].title}
      <AppButton onClick={onClick}>Button</AppButton>
    </div>
  )
}

export default Home
const fetcher = async (url: string) => {
  const response = await fetch(url)
  const json = await response.json()
  return json
}
