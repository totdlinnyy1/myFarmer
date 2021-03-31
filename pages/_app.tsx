import App from 'next/app'
import type {AppProps, AppContext} from 'next/app'
import '../styles/index.sass'

function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  return {...appProps}
}

export default MyApp
