import {NextPage} from 'next'
import {Props} from 'next/dist/client/experimental-script'
import Image from 'next/image'
import {Layout, SignInForm} from '../modules'
import useUser from '../lib/useUser'
import style from '../styles/pages/SignIn.module.sass'

const SignIn: NextPage<Props> = () => {
  const {mutateUser} = useUser({redirectTo: '/profile', redirectIfFound: true})

  return (
    <Layout title='Вход'>
      <div className={style.container}>
        <div className={style.info}>
          <h1>Вход</h1>
          <Image src='/logo.png' width={515} height={415} />
        </div>
        <div className={style.form}>
          <SignInForm mutateUser={mutateUser} />
        </div>
      </div>
    </Layout>
  )
}

export default SignIn
