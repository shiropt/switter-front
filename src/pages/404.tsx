import type { NextPage } from 'next'
import { Text, Center, Box, Heading } from '@chakra-ui/react'

const ErrorPage: NextPage = () => {
  return (
    <Box>
      <Center h="100vh">
        <Heading>404</Heading>
        <Text>- Page Not Found -</Text>
      </Center>
    </Box>
  )
}

export default ErrorPage
