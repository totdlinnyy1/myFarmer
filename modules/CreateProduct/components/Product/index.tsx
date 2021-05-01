import {useState} from 'react'
import {GiFarmTractor} from 'react-icons/gi'
import {Button, ModalWindow} from '../../../../components'
import {ModalUpdateContent} from '../index'
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
  fetchData: any
}

const Product = ({product, fetchData}: ProductProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => setIsOpen(!isOpen)

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
        <Button text='Изменить' handleSubmit={handleClick} />
      </div>
      <ModalWindow
        width={240}
        height={250}
        title='Изменить'
        isOpen={isOpen}
        onClick={handleClick}
      >
        <ModalUpdateContent
          setIsOpen={handleClick}
          product={product}
          fetchData={fetchData}
        />
      </ModalWindow>
    </div>
  )
}

export default Product
