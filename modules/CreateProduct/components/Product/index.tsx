import {Button} from '../../../../components'
import style from './Product.module.sass'

type Product = {
  productName: string
  id: string
  image: string
  coast: number
  amount: string
}

type ProductProps = {
  product: Product
}

const Product = ({product}: ProductProps) => {
  return (
    <div className={style.container}>
      <div className={style.image}>
        <img src={product.image} alt='Товар' />
      </div>
      <div className={style.productName}>
        <h1>{product.productName}</h1>
      </div>
      <div className={style.coast}>
        <h3>{`${product.coast}р/${product.amount}`}</h3>
      </div>
      <div className={style.button}>
        <Button text='Изменить' />
      </div>
    </div>
  )
}

export default Product
