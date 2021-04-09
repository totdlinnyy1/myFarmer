import {NextPage} from 'next'
import {Props} from 'next/dist/client/experimental-script'
import {Layout} from '../../modules'
import {ProfileComponent} from '../../components'
import style from '../../styles/pages/Profile.module.sass'
import useUser from '../../lib/useUser'
import role from '../../helpers/role'

const Profile: NextPage<Props> = () => {
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
      </div>
    </Layout>
  )
}

export default Profile
