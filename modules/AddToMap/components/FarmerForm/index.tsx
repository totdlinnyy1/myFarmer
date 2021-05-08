import {useState} from 'react'
import {format, add} from 'date-fns'
import InputMask from 'react-input-mask'
import {Button} from '../../../../components'
import style from './Form.module.sass'

const FarmerForm = ({products, handleSubmit, getCoordinates}) => {
  const TODAY = format(new Date(), 'yyyy-MM-dd')
  const LAST_DAY = format(add(new Date(), {months: 2}), 'yyyy-MM-dd')

  const [isProductActive, setActiveProducts] = useState([])
  const [address, setAddress] = useState('')

  const handleActive = id => {
    if (isProductActive.includes(id))
      setActiveProducts(isProductActive.filter(item => item !== id))
    else setActiveProducts([...isProductActive, id])
  }

  return (
    <div>
      <div className={style.title}>
        <h1>Выставить товары</h1>
      </div>
      <form onSubmit={handleSubmit}>
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
                  <input
                    type='checkbox'
                    name={product._id + 'check'}
                    onClick={() => handleActive(product._id)}
                  />
                </div>
                <div className={style.productName}>
                  <p>{product.label}</p>
                </div>
                <div className={style.input}>
                  <InputMask
                    mask='999'
                    maskChar=''
                    placeholder='Колличество'
                    name={product._id}
                    required
                    disabled={!isProductActive.includes(product._id)}
                  />
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
            <input
              type='text'
              name='address'
              placeholder='Адрес'
              onChange={e => setAddress(e.currentTarget.value)}
            />
            <a onClick={() => getCoordinates(address)}>Поставить метку</a>
          </div>
          <div>
            <p>Дата:</p>
            <input
              type='date'
              name='date'
              min={TODAY}
              max={LAST_DAY}
              required
            />
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
