import type { NextPage } from 'next'

import { AppButton } from '@/components/AppButton'

const Home: NextPage = () => {
  const onClick = () => {
    console.log('click')
  }
  return (
    <div>
      <AppButton onClick={onClick}>Button</AppButton>
    </div>
  )
}

export default Home
