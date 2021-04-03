import {NextPage} from 'next'
import {Props} from 'next/dist/client/experimental-script'
import {Layout} from '../../modules'
import {ProfileComponent} from '../../components'
import style from '../../styles/pages/Profile.module.sass'

const Profile: NextPage<Props> = () => {
  return (
    <Layout title='Профиль'>
      <div className={style.container}>
        <div className={style.profile}>
          <ProfileComponent
            name='Данил'
            lastname='Балцевич'
            avatar={null}
            editable={true}
            role='farmer'
            color='#fff'
          />
        </div>
      </div>
    </Layout>
  )
}

export default Profile
