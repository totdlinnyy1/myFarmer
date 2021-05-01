import {format, add} from 'date-fns'
import style from './Form.module.sass'
import {Button} from '../../../../components'

const FarmerForm = ({products}) => {
  const TODAY = format(new Date(), 'yyyy-MM-dd')
  const LAST_DAY = format(add(new Date(), {months: 2}), 'yyyy-MM-dd')

  return (
    <div>
      <div className={style.title}>
        <h1>Выставить товары</h1>
      </div>
      <form>
        <div className={style.table}>
          <div className={style.tableHeader}>
            <div className={style.tableHeaderEl}>
              <h4>Товар</h4>
            </div>
            <div className={style.tableHeaderEl}>
              <h4>Колличество</h4>
            </div>
          </div>
          <div className={style.tableBody}>
            {products.map(product => (
              <div key={product._id} className={style.tableBodyEl}>
                <div className={style.checkbox}>
                  <input type='checkbox' />
                </div>
                <div className={style.productName}>
                  <p>{product.label}</p>
                </div>
                <div className={style.input}>
                  <input type='text' placeholder='Колличество' />
                </div>
                <div className={style.amount}>
                  <p>{product.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={style.additionalData}>
          <div>
            <p>Адрес:</p>
            <input type='text' placeholder='Адрес' />
            <a>Поставить метку</a>
          </div>
          <div>
            <p>Дата:</p>
            <input type='date' min={TODAY} max={LAST_DAY} />
          </div>
        </div>
        <div className={style.button}>
          <Button text='Выставить' type='submit' />
        </div>
      </form>
    </div>
  )
}

export default FarmerForm
