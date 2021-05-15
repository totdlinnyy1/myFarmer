import {FC} from 'react'
import {FarmerTableBody, FarmerTableHeader} from '../../components'
import style from './FarmerTable.module.sass'

interface FarmerTableProps {
  mapProducts: [
    {
      _id: string
      products: [{_id: string; product: {label: string}; count: number}]
      placemark: {adrress: string; coordinates: number[]}
      status: string
    }
  ]
}

const FarmerTable: FC<FarmerTableProps> = ({mapProducts}) => {
  console.log(mapProducts)
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
