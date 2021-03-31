import {ReactNode} from 'react'
import Head from 'next/head'
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
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
