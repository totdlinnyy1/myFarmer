import {FarmerForm, Map} from '../../components'
import style from './FarmerContainer.module.sass'

type FarmerContainerProps = {
  products: [{_id; owner; image; coast; value; label; amount; class}]
}

type body = {
  date: string
  address: string
  products: any
}

const FarmerContainer = ({products}: FarmerContainerProps) => {
  const handleSubmit = e => {
    e.preventDefault()
    const body: body = {
      date: e.currentTarget.date.value,
      address: e.currentTarget.address.value,
      products: [],
    }
    products.forEach(product => {
      if (e.currentTarget[product._id].value)
        body.products.push({
          id: product._id,
          count: e.currentTarget[product._id].value,
        })
    })
    console.log(body)
  }
  return (
    <div className={style.container}>
      <div className={style.form}>
        <FarmerForm products={products} handleSubmit={handleSubmit} />
      </div>
      <div className={style.map}>
        <Map placemark={null} />
      </div>
    </div>
  )
}

export default FarmerContainer
