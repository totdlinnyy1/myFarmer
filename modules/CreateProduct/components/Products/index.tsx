import style from './Products.module.sass'
import {Product} from '../index'

const Products = ({fetchedProducts}) => {
  console.log(fetchedProducts)
  return (
    <div className={style.container}>
      {fetchedProducts.length ? (
        <div className={style.list}>
          {fetchedProducts.map((product, key) => (
            <Product product={product} key={key} />
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
