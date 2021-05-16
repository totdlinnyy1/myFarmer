import {GetServerSideProps, NextPage} from 'next'
import {Types} from 'mongoose'
import {Layout} from '../../modules'
import dbConnect from '../../utils/dbConnect'
import {User} from '../../models'
import {ProfileComponent} from '../../components'
import {useState} from 'react'
import role from '../../helpers/role'
import style from '../../styles/pages/Profile.module.sass'

interface UserPage {
  fetchedUser: string
}

const UserPage: NextPage<UserPage> = ({fetchedUser}) => {
  const [user] = useState(JSON.parse(fetchedUser))
  return (
    <Layout title='Hello' loading={false}>
      <div className={style.container}>
        <div className={style.profile}>
          <ProfileComponent
            name={user.name}
            lastname={user.lastname}
            avatar={user.avatar && user.avatar}
            editable={false}
            role={role(user.role)}
            color='#fff'
          />
        </div>
        <div style={{height: '500px'}} />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  await dbConnect()
  if (Types.ObjectId.isValid(context.params.id.toString())) {
    const fetchedUser = await User.findById(context.params.id).select([
      'name',
      'lastname',
      'number',
      'role',
      'avatar',
    ])
    if (fetchedUser) {
      return {
        props: {
          fetchedUser: JSON.stringify(fetchedUser),
        },
      }
    }
  }
  return {
    redirect: {
      destination: '/profile',
    },
    props: {},
  }
}

export default UserPage
