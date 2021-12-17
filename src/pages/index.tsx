import type { NextPage } from 'next'

import { AppButton } from '@/components/shared/AppButtonpButton'

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
