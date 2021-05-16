import Router from 'next/router'
import {Button, ProductBlock} from '../../../../components'
import style from './List.module.sass'
import {FC} from 'react'

interface ListProps {
  objects: any
}

const List: FC<ListProps> = ({objects}) => {
  return (
    <div className={style.container}>
      <div className={style.title}>
        <h1>Продукты</h1>
      </div>
      <div className={style.items}>
        {objects &&
          objects.map((object, key) => (
            <ProductBlock
              id={object.owner._id}
              avatar={object.owner.avatar ? object.owner.avatar : null}
              fullName={`${object.owner.lastname} ${object.owner.name}`}
              products={object.products}
              adrress={object.placemark.address}
              handleClick={() => console.log('hello')}
              key={key}
            />
          ))}
      </div>
      <div className={style.button}>
        <Button text='Сделать заказ' handleSubmit={() => Router.push('/new')} />
      </div>
    </div>
  )
}

export default List
