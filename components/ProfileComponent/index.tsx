import Link from 'next/link'
import {FiEdit2} from 'react-icons/fi'
import Avatar from '../Avatar'
import style from './Profile.module.sass'

type ProfileProps = {
  name: string
  lastname: string
  avatar: string | null
  editable: boolean
  role: string
  color: string
}

const ProfileComponent = ({
  name,
  lastname,
  avatar,
  editable,
  role,
  color,
}: ProfileProps) => {
  return (
    <div className={style.profile}>
      <div className={style.avatar}>
        <Avatar avatarUrl={avatar} />
      </div>
      <div>
        <div className={style.name}>
          <h1 style={{color: `${color}`}}>{`${lastname} ${name}`}</h1>
          {editable && (
            <Link href='/profile/edit'>
              <a>
                <FiEdit2 />
              </a>
            </Link>
          )}
        </div>
        <div style={{color: `${color}`}}>
          <p>{role}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileComponent
