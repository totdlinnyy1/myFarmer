import {FC} from 'react'
import {IndexMap, List} from '../components'
import style from './ProfileMap.module.sass'

interface ProfileMapProps {
  MapObjects: [number][]
  type: string
}

const ProfileMap: FC<ProfileMapProps> = ({MapObjects, type}) => {
  return (
    <div className={style.container}>
      <div className={style.data}>
        <div className={style.map}>
          <IndexMap
            handleMapClick={() => console.log('hello')}
            placemarks={MapObjects}
          />
        </div>
        <div className={style.list}>
          <List objects={MapObjects} type={type} />
        </div>
      </div>
    </div>
  )
}

export default ProfileMap
