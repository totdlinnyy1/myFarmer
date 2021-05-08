import {FarmerTableBody, FarmerTableHeader} from '../../components'
import style from './FarmerTable.module.sass'

type FarmerTableProps = {
  mapProducts: any
}

const FarmerTable = ({mapProducts}: FarmerTableProps) => {
  return (
    <div className={style.farmerTable}>
      <h1>Выставленные товары</h1>
      <div className={style.table}>
        <FarmerTableHeader />
        <FarmerTableBody mapProducts={mapProducts} />
      </div>
    </div>
  )
}

export default FarmerTable
