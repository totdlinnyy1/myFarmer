import {FC} from 'react'
import {
  YMaps,
  Map,
  Placemark,
  SearchControl,
  ZoomControl,
} from 'react-yandex-maps'
import style from './IndexMap.module.sass'

interface MapProps {
  handleMapClick: () => void
  mapObjects: any
}

const IndexMap: FC<MapProps> = ({mapObjects}) => {
  console.log(mapObjects)
  return (
    <YMaps query={{apikey: '02130a82-c368-4497-b079-9609641139cd'}}>
      <div className={style.map}>
        <Map
          defaultState={{center: [55.75, 37.57], zoom: 9}}
          width='100%'
          height='100%'
        >
          {mapObjects &&
            mapObjects.map(placemark => (
              <Placemark
                geometry={placemark.placemark.coordinates}
                key={placemark._id}
              />
            ))}
          <SearchControl options={{noPlacemark: true}} />
          <ZoomControl />
        </Map>
      </div>
    </YMaps>
  )
}

export default IndexMap
