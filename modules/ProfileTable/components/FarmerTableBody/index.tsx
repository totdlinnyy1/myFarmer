import Link from 'next/link'
import {BiShowAlt} from 'react-icons/bi'
import {AiTwotoneDelete} from 'react-icons/ai'
import status from '../../../../helpers/status'
import style from './TableBody.module.sass'

type FarmerTableBodyProps = {
  mapProducts: any
}

const FarmerTableBody = ({mapProducts}: FarmerTableBodyProps) => {
  return (
    <div>
      {!mapProducts.length ? (
        <div className={style.link}>
          <Link href='/new'>
            <a>Выставить товары на карту покупателей?</a>
          </Link>
        </div>
      ) : (
        <div>
          {mapProducts.map((mapProduct, i) => (
            <div key={mapProduct._id} className={style.tableBodyEl}>
              <div className={style.number}>
                <p>{i + 1}</p>
              </div>
              <div className={style.products}>
                {mapProduct.products.map(product => (
                  <p key={product._id}>
                    {product.product &&
                      `${product.product.label} (${product.count})`}
                  </p>
                ))}
              </div>
              <div className={style.address}>
                <p>{mapProduct.placemark.address}</p>
              </div>
              <div className={style.status}>
                <p>{status(mapProduct.status)}</p>
              </div>
              <div className={style.actions}>
                <div style={{marginRight: 10}}>
                  <BiShowAlt size={24} />
                </div>
                <div>
                  <AiTwotoneDelete size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FarmerTableBody
