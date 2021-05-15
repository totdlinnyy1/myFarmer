import {FC} from 'react'
import {Product} from '../index'
import style from './Products.module.sass'

interface ProductsProps {
  fetchedProducts: [
    {
      _id: string
      image?: string
      label: string
      coast: number
      amount: string
    }
  ]
  fetchData: () => void
}

const Products: FC<ProductsProps> = ({fetchedProducts, fetchData}) => {
  return (
    <div className={style.container}>
      {fetchedProducts.length ? (
        <div className={style.list}>
          {fetchedProducts.map((product, key) => (
            <Product product={product} key={key} fetchData={fetchData} />
          ))}
        </div>
      ) : (
        <div className={style.title}>
          <h1>У вас еще нет товаров, добавьте новый!</h1>
        </div>
      )}
    </div>
  )
}

export default Products
