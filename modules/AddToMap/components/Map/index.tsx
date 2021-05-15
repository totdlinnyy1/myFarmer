import {FC, useEffect, useState} from 'react'
import {Map, Placemark, YMaps, ZoomControl} from 'react-yandex-maps'
import style from './Map.module.sass'

interface MapComponentProps {
  placemark: {
    coordinates: [number]
  }
}

const MapComponent: FC<MapComponentProps> = ({placemark}) => {
  const [center, setCenter] = useState<number[]>([55.75, 37.57])
  const [placemarkCoordinates, setPlacemarkCoordinates] = useState<
    number[] | null
  >(null)
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
