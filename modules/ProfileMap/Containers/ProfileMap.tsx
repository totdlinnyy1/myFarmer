import {IndexMap, List} from '../Components'
import style from './ProfileMap.module.sass'

type ProfileMapProps = {
  MapObjects: any
  type: string
}

const ProfileMap = ({MapObjects, type}: ProfileMapProps) => {
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
