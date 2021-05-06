import {Map, Placemark, YMaps, ZoomControl} from 'react-yandex-maps'
import style from './Map.module.sass'
import {useEffect, useState} from 'react'

type MapComponentProps = {
  placemark: {
    coordinates: [number]
  }
}

const MapComponent = ({placemark}: MapComponentProps) => {
  const [center, setCenter] = useState([55.75, 37.57])
  const [placemarkCoordinates, setPlacemarkCoordinates] = useState(null)
  useEffect(() => {
    if (placemark) {
      setPlacemarkCoordinates(placemark.coordinates)
      setCenter(placemark.coordinates)
    }
  }, [placemark])
  return (
    <YMaps>
      <div className={style.map}>
        <Map
          defaultState={{center, zoom: 9}}
          state={{center, zoom: 9}}
          width='100%'
          height='100%'
        >
          {placemarkCoordinates && (
            <Placemark geometry={placemarkCoordinates} />
          )}
          <ZoomControl />
        </Map>
      </div>
    </YMaps>
  )
}

export default MapComponent
