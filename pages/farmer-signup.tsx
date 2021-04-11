import {NextPage} from 'next'
import {Props} from 'next/dist/client/experimental-script'
import Image from 'next/image'
import useUser from '../lib/useUser'
import {Layout, SignUpForm} from '../modules'
import style from '../styles/pages/SignIn.module.sass'

const FarmerSignIn: NextPage<Props> = () => {
  const {user, mutateUser} = useUser({
    redirectTo: '/profile',
    redirectIfFound: true,
  })

  if (user && user.isLoggedIn) {
    return <Layout title='loading...' loading={true} />
  }

  return (
    <Layout title='Регистрация' loading={false}>
      <div className={style.container}>
        <div className={style.info}>
          <h1>Регистрация</h1>
          <p>Если Вы - фермер, то здесь Вы сможете продать свою продукцию!</p>
          <Image src='/farmer.png' width={301} height={603} />
        </div>
        <div className={style.form}>
          {/* eslint-disable-next-line jsx-a11y/aria-role */}
          <SignUpForm role='farmer' mutateUser={mutateUser} />
        </div>
      </div>
    </Layout>
  )
}

export default FarmerSignIn
