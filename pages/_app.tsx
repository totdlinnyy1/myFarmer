import App from 'next/app'
import type {AppProps, AppContext} from 'next/app'
import {SWRConfig} from 'swr'
import {ChakraProvider} from '@chakra-ui/react'
import fetchJson from '../lib/fetchJson'
import {NextNProgress} from '../components'
import theme from '../utils/theme'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
      }}
    >
      <ChakraProvider theme={theme}>
        <NextNProgress />
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  return {...appProps}
}

export default MyApp
