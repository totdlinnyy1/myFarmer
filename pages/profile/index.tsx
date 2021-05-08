import {GetServerSideProps} from 'next'
import withSession from '../../lib/session'
import dbConnect from '../../utils/dbConnect'
import Order from '../../models/Order'
import {Product, FarmerMapProducts} from '../../models'
import useUser from '../../lib/useUser'
import role from '../../helpers/role'
import isFarmer from '../../helpers/isFarmer'
import {Layout, ProfileMap, CreateProduct, FarmerTable} from '../../modules'
import {ProfileComponent} from '../../components'
import style from '../../styles/pages/Profile.module.sass'

const Profile = ({fetchedOrders, fetchedProducts, fetchedMapProducts}) => {
  const {user} = useUser({redirectTo: '/signin'})

  if (!user || user.isLoggedIn === false) {
    return <Layout title='loading...' loading={true} />
  }

  return (
    <Layout title='Профиль' loading={false}>
      <div className={style.container}>
        <div className={style.profile}>
          <ProfileComponent
            name={user.name}
            lastname={user.lastname}
            avatar={user.avatar}
            editable={true}
            /* eslint-disable-next-line jsx-a11y/aria-role */
            role={role(user.role)}
            color='#fff'
          />
        </div>
        <div>
          <ProfileMap MapObjects={JSON.parse(fetchedOrders)} type={user.role} />
        </div>
        {isFarmer(user.role) && (
          <div>
            <FarmerTable mapProducts={JSON.parse(fetchedMapProducts)} />
            <CreateProduct
              id={user.id}
              fetchedProducts={JSON.parse(fetchedProducts)}
            />
          </div>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = withSession(
  async function ({req}) {
    const user = req.session.get('user')
    if (isFarmer(user.role)) {
      await dbConnect()
      const fetchedOrders = await Order.find({status: 'В процессе'})
      const fetchedProducts = await Product.find({owner: user.id})
      const fetchedMapProducts = await FarmerMapProducts.find({
        owner: user.id,
      }).populate({path: 'products.product', model: Product})
      console.log(fetchedMapProducts)
      return {
        props: {
          fetchedOrders: JSON.stringify(fetchedOrders),
          fetchedProducts: JSON.stringify(fetchedProducts),
          fetchedMapProducts: JSON.stringify(fetchedMapProducts),
        },
      }
    }
  }
)

export default Profile
