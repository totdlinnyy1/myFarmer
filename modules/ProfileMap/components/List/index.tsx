import Router from 'next/router'
import {Button, OrderBlock} from '../../../../components'
import style from './List.module.sass'
import {FC} from 'react'

interface ListProps {
  objects: any
  type: string
}
const List: FC<ListProps> = props => {
  const HEADER = props.type === 'buyer' ? 'Продукты' : 'Заказы'
  const BUTTON_TEXT =
    props.type === 'buyer' ? 'Сделать заказ' : 'Выставить товар'
  return (
    <div className={style.container}>
      <div className={style.title}>
        <h1>{HEADER}</h1>
      </div>
      <div className={style.items}>
        {props.objects.map((object, key) => (
          <OrderBlock
            type={props.type}
            avatar={object.avatar}
            fullName={`${object.lastname} ${object.name}`}
            products={object.products}
            handleClick={() => console.log('hello')}
            key={key}
          />
        ))}
      </div>
      <div className={style.button}>
        <Button text={BUTTON_TEXT} handleSubmit={() => Router.push('/new')} />
      </div>
    </div>
  )
}

export default List
