import {FC} from 'react'
import {Avatar, Button} from '../index'
import style from './OrderBlock.module.sass'

interface OrderBlockProps {
  type: string
  avatar: string
  fullName: string
  products: any
  handleClick: any
}

const OrderBlock: FC<OrderBlockProps> = props => {
  if (props.type === 'farmer') {
    return (
      <div className={style.container}>
        <div className={style.userInfo}>
          <div>
            <Avatar avatarUrl={props.avatar} />
          </div>
          <div>
            <h3>{props.fullName}</h3>
          </div>
          <div className={style.button}>
            <Button text='Подробнее' handleSubmit={props.handleClick} />
          </div>
        </div>
        <div className={style.products}>
          {props.products.map((product, key) => (
            <p
              key={key}
            >{`${product.label} ${product.count}${product.amount}`}</p>
          ))}
        </div>
      </div>
    )
  }
}

export default OrderBlock
