import {FaUserAlt} from 'react-icons/fa'
import style from './Avatar.module.sass'

type AvatarProps = {
  avatarUrl: string | null
}

const Avatar = ({avatarUrl}: AvatarProps) => {
  return (
    <div className={style.avatar}>
      {avatarUrl ? (
        <img src={avatarUrl} alt='Avatar' />
      ) : (
        <FaUserAlt size='3em' color='#fff' />
      )}
    </div>
  )
}

export default Avatar
