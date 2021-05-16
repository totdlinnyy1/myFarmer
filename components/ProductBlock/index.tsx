import {FC} from 'react'
import Link from 'next/link'
import {Avatar, Button} from '../index'
import style from './ProductBlock.module.sass'

interface OrderBlockProps {
  id: string
  avatar: string
  fullName: string
  products: any
  handleClick: any
  adrress: string
}

const ProductBlock: FC<OrderBlockProps> = props => {
  return (
    <div className={style.container}>
      <div className={style.userInfo}>
        <div className={style.name}>
          <div>
            <Link href={`/profile/${props.id}`}>
              <a>
                <Avatar avatarUrl={props.avatar} />
              </a>
            </Link>
          </div>
          <div>
            <p>{props.fullName}</p>
          </div>
        </div>
        <div className={style.button}>
          <Button text='Подробнее' handleSubmit={props.handleClick} />
        </div>
      </div>
      <div className={style.products}>
        {props.products.map((product, key) => (
          <p
            key={key}
          >{`${product.product.label} ${product.count}${product.product.amount}`}</p>
        ))}
      </div>
      <div>
        <p>{props.adrress}</p>
      </div>
    </div>
  )
}

export default ProductBlock
