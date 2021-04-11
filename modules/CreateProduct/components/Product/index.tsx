import {Button} from '../../../../components'
import {GiFarmTractor} from 'react-icons/gi'
import style from './Product.module.sass'

type Product = {
  label: string
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
        {product.image ? (
          <img src={product.image} alt='Товар' />
        ) : (
          <div className={style.placeholder}>
            <GiFarmTractor size={80} color='#fff' />
          </div>
        )}
      </div>
      <div className={style.productName}>
        <h1>{product.label}</h1>
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
