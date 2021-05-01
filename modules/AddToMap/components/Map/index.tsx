import {Map, Placemark, YMaps, ZoomControl} from 'react-yandex-maps'
import style from './Map.module.sass'

type MapComponentProps = {
  placemark: {
    geometry: [number]
  }
}

const MapComponent = ({placemark}: MapComponentProps) => {
  return (
    <YMaps>
      <div className={style.map}>
        <Map
          defaultState={{center: [55.75, 37.57], zoom: 9}}
          width='100%'
          height='100%'
        >
          {placemark && <Placemark defaultGeometry={placemark.geometry} />}
          <ZoomControl />
        </Map>
      </div>
    </YMaps>
  )
}

export default MapComponent
