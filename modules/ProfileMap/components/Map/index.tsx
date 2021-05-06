import {
  YMaps,
  Map,
  Placemark,
  SearchControl,
  ZoomControl,
} from 'react-yandex-maps'
import style from './IndexMap.module.sass'

type MapProps = {
  handleMapClick: any
  placemarks: any
}

const IndexMap = ({handleMapClick, placemarks}: MapProps) => {
  return (
    <YMaps query={{apikey: '02130a82-c368-4497-b079-9609641139cd'}}>
      <div className={style.map}>
        <Map
          defaultState={{center: [55.75, 37.57], zoom: 9}}
          width='100%'
          height='100%'
        >
          {placemarks &&
            placemarks.map((placemark, key) => (
              <Placemark
                defaultGeometry={placemark.geometry}
                onClick={handleMapClick}
                key={key}
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
