import {YMaps, Map, Placemark} from 'react-yandex-maps'
import style from './IndexMap.module.sass'

type MapProps = {
  handleMapClick: any
  placemarks: any
}

const IndexMap = ({handleMapClick, placemarks}: MapProps) => {
  return (
    <YMaps>
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
        </Map>
      </div>
    </YMaps>
  )
}

export default IndexMap
