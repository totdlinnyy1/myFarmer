import App from 'next/app'
import type {AppProps, AppContext} from 'next/app'
import {SWRConfig} from 'swr'
import fetchJson from '../lib/fetchJson'
import '../styles/index.sass'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  return {...appProps}
}

export default MyApp
