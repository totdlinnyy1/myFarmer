import App from 'next/app'
import type {AppProps, AppContext} from 'next/app'
import {SWRConfig} from 'swr'
import fetchJson from '../lib/fetchJson'
import {NextNProgress} from '../components'
import '../styles/index.sass'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
      }}
    >
      <NextNProgress />
      <Component {...pageProps} />
    </SWRConfig>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  return {...appProps}
}

export default MyApp
