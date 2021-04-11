import style from './OrderBlock.module.sass'
import {Avatar, Button} from '../index'

type OrderBlockProps = {
  type: string
  avatar: string
  fullName: string
  products: any
  handleClick: any
}

const OrderBlock = (props: OrderBlockProps) => {
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
