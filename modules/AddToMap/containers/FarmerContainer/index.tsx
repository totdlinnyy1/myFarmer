import {useState} from 'react'
import Router from 'next/router'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {FarmerForm, Map} from '../../components'
import style from './FarmerContainer.module.sass'

type FarmerContainerProps = {
  id: string
  products: [{_id; owner; image; coast; value; label; amount; class}]
}

type body = {
  owner: string
  date: string
  placemark: any
  products: any
}

const FarmerContainer = ({products, id}: FarmerContainerProps) => {
  const [placemark, setPlacemark] = useState(null)
  const handleSubmit = async e => {
    e.preventDefault()
    if (placemark) {
      const body: body = {
        owner: id,
        date: e.currentTarget.date.value,
        placemark,
        products: [],
      }
      products.forEach(product => {
        if (
          e.currentTarget[product._id].value &&
          e.currentTarget[product._id + 'check'].checked
        )
          body.products.push({
            product: product._id,
            count: e.currentTarget[product._id].value,
          })
      })
      if (body.products.length) {
        await axios
          .post('/api/farmer/add-to-map', {data: JSON.stringify(body)})
          .then(response => {
            if (response.status === 200) {
              Router.push('/profile')
            }
          })
      } else toast.error('Вы не отметили ни одного продукта')
    } else toast.error('Поставьте метку')
  }

  const getCoordinates = async address => {
    if (address) {
      await axios(
        `https://geocode-maps.yandex.ru/1.x?geocode=${address}&apikey=02130a82-c368-4497-b079-9609641139cd&format=json`
      ).then(response => {
        const adr =
          response.data.response.GeoObjectCollection.featureMember[0].GeoObject
            .metaDataProperty.GeocoderMetaData.text
        const coordinates = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
          .split(' ')
          .reverse()
        setPlacemark({coordinates, address: adr})
      })
    } else toast.error('Введите адрес')
  }
  return (
    <div className={style.container}>
      <div className={style.form}>
        <FarmerForm
          products={products}
          handleSubmit={handleSubmit}
          getCoordinates={getCoordinates}
        />
      </div>
      <div className={style.map}>
        <Map placemark={placemark} />
      </div>
    </div>
  )
}

export default FarmerContainer
