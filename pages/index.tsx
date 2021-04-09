import {NextPage} from 'next'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {Props} from 'next/dist/client/experimental-script'
import {Layout} from '../modules'
import style from '../styles/pages/Home.module.sass'
import {Button} from '../components'

const IndexPage: NextPage<Props> = () => {
  const router = useRouter()

  return (
    <Layout title='Главная' loading={false}>
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.info}>
            <div className={style.title}>
              <h1>
                <span>«Мой фермер»</span> - оналйн- сервис для поиска и продажи
                фeрмерской продукции.
              </h1>
            </div>
            <div className={style.statistics}>
              <div>
                <h3>1000</h3>
                <p>покупателей</p>
              </div>
              <div>
                <h3>900</h3>
                <p>заказов</p>
              </div>
              <div>
                <h3>200</h3>
                <p>фермеров</p>
              </div>
            </div>
            <div className={style.buttons}>
              <Button
                text='Cтать фермером'
                handleSubmit={() => router.push('/farmer-signup')}
              />
              <Button
                text='Cделать заказ'
                handleSubmit={() => router.push('/buyer-signup')}
                className={style.buyerButton}
              />
            </div>
          </div>
          <div className='image'>
            <Image src='/logo.png' width={615} height={515} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default IndexPage
