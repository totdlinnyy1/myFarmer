import {NextPage} from 'next'
import {Props} from 'next/dist/client/experimental-script'
import Image from 'next/image'
import {Layout, SignUpForm} from '../modules'
import style from '../styles/pages/SignIn.module.sass'

const BuyerSignUp: NextPage<Props> = () => {
  return (
    <Layout title='Регистрация'>
      <div className={style.container}>
        <div className={style.info}>
          <h1>Регистрация</h1>
          <p>Здесь вы можете приобрести фермерские продукты без посредников!</p>
          <Image src='/farmer.png' width={301} height={603} />
        </div>
        <div className={style.form}>
          {/* eslint-disable-next-line jsx-a11y/aria-role */}
          <SignUpForm role='buyer' />
        </div>
      </div>
    </Layout>
  )
}

export default BuyerSignUp
