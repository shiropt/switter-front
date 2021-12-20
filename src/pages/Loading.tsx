import { Header } from '@/components/shared/Header'
import type { NextPage } from 'next'
import { Spinner, Center, Box } from '@chakra-ui/react'

type Props = {
  isSignIn: boolean
}

const Loading: NextPage<Props> = ({ isSignIn }) => {
  return (
    <Box>
      <Header isSignIn={isSignIn} />
      <Center h="100vh" bg="#7c79794c" opacity="0.7">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
    </Box>
  )
}

export default Loading
