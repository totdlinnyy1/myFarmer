import {FarmerForm, Map} from '../../components'
import style from './FarmerContainer.module.sass'

type FarmerContainerProps = {
  products: [{_id; owner; image; coast; value; label; amount; class}]
}

const FarmerContainer = ({products}: FarmerContainerProps) => {
  return (
    <div className={style.container}>
      <div className={style.form}>
        <FarmerForm products={products} />
      </div>
      <div className={style.map}>
        <Map placemark={null} />
      </div>
    </div>
  )
}

export default FarmerContainer
