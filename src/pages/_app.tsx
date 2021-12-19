import 'nprogress/nprogress.css'
import { ChakraProvider, Spinner, Center } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import nprogress from 'nprogress'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.25 })

const MyApp = ({ Component, pageProps }: AppProps) => {
  if (process.browser) {
    nprogress.start()
  }

  useEffect(() => {
    nprogress.done()
  })

  return (
    <>
      <Head>
        <title>Switter</title>
        <meta />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecoilRoot>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RecoilRoot>
    </>
  )
}

export default MyApp
