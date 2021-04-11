import style from './Products.module.sass'
import {Product} from '../index'

const Products = ({fetchedProducts}) => {
  return (
    <div className={style.container}>
      {fetchedProducts ? (
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
