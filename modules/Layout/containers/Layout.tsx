import {ReactNode} from 'react'
import Head from 'next/head'
import {Toaster} from 'react-hot-toast'
import {PuffLoader} from 'react-spinners'
import {Header, Footer} from '../components'

type LayoutProps = {
  title: string
  loading: boolean
  children?: ReactNode
}

const Layout = ({title, loading, children}: LayoutProps) => {
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
      <main>
        {loading ? (
          <div
            style={{
              width: '100%',
              height: 800,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PuffLoader size={150} color='#fff' />
          </div>
        ) : (
          children
        )}
      </main>
      <Footer />
    </>
  )
}

export default Layout
