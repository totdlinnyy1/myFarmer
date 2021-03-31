import {NextComponentType} from 'next'
import Head from 'next/head'
import {Header, Footer} from '../components'

type LayoutProps = {
  title: string
  children: any
}

const Layout: NextComponentType = ({title, children}: LayoutProps) => {
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
