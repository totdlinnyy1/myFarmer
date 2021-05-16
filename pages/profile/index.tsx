import {GetServerSideProps, NextPage} from 'next'
import withSession from '../../lib/session'
import dbConnect from '../../utils/dbConnect'
import {Product, FarmerMapProducts, User} from '../../models'
import useUser from '../../lib/useUser'
import role from '../../helpers/role'
import isFarmer from '../../helpers/isFarmer'
import {
  Layout,
  CreateProduct,
  FarmerTable,
  ProfileBuyerMap,
} from '../../modules'
import {ProfileComponent} from '../../components'
import style from '../../styles/pages/Profile.module.sass'

interface ProfileProps {
  fetchedProducts: string
  fetchedMapProducts: string
}

const Profile: NextPage<ProfileProps> = ({
  fetchedProducts,
  fetchedMapProducts,
}) => {
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
          {isFarmer(user.role) ? null : (
            <ProfileBuyerMap MapObjects={JSON.parse(fetchedMapProducts)} />
          )}
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
    await dbConnect()
    if (user) {
      if (isFarmer(user.role)) {
        const fetchedProducts = await Product.find({owner: user.id})
        const fetchedMapProducts = await FarmerMapProducts.find({
          owner: user.id,
        }).populate({path: 'products.product', model: Product})
        return {
          props: {
            fetchedProducts: JSON.stringify(fetchedProducts),
            fetchedMapProducts: JSON.stringify(fetchedMapProducts),
          },
        }
      }
      const fetchedMapProducts = await FarmerMapProducts.find().populate([
        {
          path: 'products.product',
          model: Product,
        },
        {
          path: 'owner',
          model: User,
          select: ['name', 'lastname', 'avatar'],
        },
      ])

      return {
        props: {
          fetchedMapProducts: JSON.stringify(fetchedMapProducts),
          fetchedProducts: JSON.stringify(null),
        },
      }
    }
    return {
      props: {isLoggedIn: JSON.stringify(false)},
    }
  }
)

export default Profile
