import {ReactNode} from 'react'
import Head from 'next/head'
import {Toaster} from 'react-hot-toast'
import {Header, Footer} from '../components'

type LayoutProps = {
  title: string
  children: ReactNode
}

const Layout = ({title, children}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Toaster
        toastOptions={{
          style: {
            margin: '150px',
          },
        }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
