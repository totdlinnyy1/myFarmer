import {FC} from 'react'
import {IndexMap, List} from '../components'
import style from './ProfileMap.module.sass'

interface ProfileMapProps {
  MapObjects: [number][]
}

const ProfileBuyerMap: FC<ProfileMapProps> = ({MapObjects}) => {
  return (
    <div className={style.container}>
      <div className={style.data}>
        <div className={style.map}>
          <IndexMap
            handleMapClick={() => console.log('hello')}
            mapObjects={MapObjects}
          />
        </div>
        <div className={style.list}>
          <List objects={MapObjects} />
        </div>
      </div>
    </div>
  )
}

export default ProfileBuyerMap
