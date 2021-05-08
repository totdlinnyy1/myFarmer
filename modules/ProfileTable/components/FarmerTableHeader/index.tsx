import style from './TableHeader.module.sass'

const FarmerTableHeader = () => {
  return (
    <div className={style.header}>
      <div className={style.number}>
        <p>#</p>
      </div>
      <div className={style.products}>
        <p>Продукты (кол)</p>
      </div>
      <div className={style.address}>
        <p>Адрес</p>
      </div>
      <div className={style.status}>
        <p>Статус</p>
      </div>
      <div>
        <p>Действия</p>
      </div>
    </div>
  )
}

export default FarmerTableHeader
