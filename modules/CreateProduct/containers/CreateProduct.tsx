import {useState} from 'react'
import {NewProductButton, Products, ModalContent} from '../components'
import {ModalWindow} from '../../../components'
import style from './CreateProduct.module.sass'

type CreateProductProps = {
  id: string
  fetchedProducts: any
}

const CreateProduct = ({id, fetchedProducts}: CreateProductProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => setIsOpen(!isOpen)

  return (
    <div className={style.container}>
      <div className={style.title}>
        <h1>Мои товары</h1>
      </div>
      <Products fetchedProducts={fetchedProducts} />
      <NewProductButton onClick={handleClick} />
      <ModalWindow
        width={300}
        height={400}
        title='Добавить товар'
        isOpen={isOpen}
        onClick={handleClick}
      >
        <ModalContent id={id} setIsOpen={setIsOpen} />
      </ModalWindow>
    </div>
  )
}

export default CreateProduct
