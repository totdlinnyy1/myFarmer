import {useState} from 'react'
import axios from 'axios'
import {NewProductButton, Products, ModalContent} from '../components'
import {ModalWindow} from '../../../components'
import style from './CreateProduct.module.sass'

type CreateProductProps = {
  id: string
  fetchedProducts: any
}

const CreateProduct = ({id, fetchedProducts}: CreateProductProps) => {
  const [products, setProducts] = useState(fetchedProducts)
  const [isOpen, setIsOpen] = useState(false)

  const fetchData = async () => {
    await axios('/api/farmer/product').then(response =>
      setProducts(response.data)
    )
  }

  const handleClick = () => setIsOpen(!isOpen)

  return (
    <div className={style.container}>
      <div className={style.title}>
        <h1>Мои товары</h1>
      </div>
      <Products fetchedProducts={products} />
      <NewProductButton onClick={handleClick} />
      <ModalWindow
        width={300}
        height={400}
        title='Добавить товар'
        isOpen={isOpen}
        onClick={handleClick}
      >
        <ModalContent id={id} setIsOpen={setIsOpen} fetchData={fetchData} />
      </ModalWindow>
    </div>
  )
}

export default CreateProduct
