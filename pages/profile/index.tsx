import {NextPage, GetServerSideProps} from 'next'
import {Props} from 'next/dist/client/experimental-script'
import withSession from '../../lib/session'
import dbConnect from '../../utils/dbConnect'
import Order from '../../models/Order'
import useUser from '../../lib/useUser'
import role from '../../helpers/role'
import isFarmer from '../../helpers/isFarmer'
import {Layout, ProfileMap, CreateProduct} from '../../modules'
import {ProfileComponent} from '../../components'
import style from '../../styles/pages/Profile.module.sass'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Profile: NextPage<Props> = ({fetchedOrders}) => {
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
            <CreateProduct id={user.id} />
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
      return {
        props: {fetchedOrders: JSON.stringify(fetchedOrders)},
      }
    }
  }
)

export default Profile
