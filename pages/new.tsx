import {GetServerSideProps, NextPage} from 'next'
import useUser from '../lib/useUser'
import isFarmer from '../helpers/isFarmer'
import {FarmerContainer, Layout} from '../modules'
import withSession from '../lib/session'
import dbConnect from '../utils/dbConnect'
import {Product} from '../models'
import style from '../styles/pages/New.module.sass'

interface NewProps {
  fetchedProducts: string
}
const NewPage: NextPage<NewProps> = ({fetchedProducts}) => {
  const {user} = useUser({redirectTo: '/signin'})
  if (!user || user.isLoggedIn === false) {
    return <Layout title='loading...' loading={true} />
  }
  console.log(fetchedProducts)

  const TITLE = isFarmer(user.role)
    ? 'Добавить продукты на карту'
    : 'Сделать заказ'

  return (
    <Layout title={TITLE} loading={false}>
      <div className={style.container}>
        {isFarmer(user.role) ? (
          <FarmerContainer
            products={JSON.parse(fetchedProducts)}
            id={user.id}
          />
        ) : null}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = withSession(
  async function ({req}) {
    const user = req.session.get('user')
    if (isFarmer(user.role)) {
      await dbConnect()
      const fetchedProducts = await Product.find({owner: user.id})
      return {
        props: {
          fetchedProducts: JSON.stringify(fetchedProducts),
        },
      }
    }
  }
)

export default NewPage
