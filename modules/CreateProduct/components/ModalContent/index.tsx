import {useState} from 'react'
import Router from 'next/router'
import axios from 'axios'
import {Formik} from 'formik'
import {toast} from 'react-hot-toast'
import Compressor from 'compressorjs'
import {storage} from '../../../../utils/firebase'
import {Button, SelectProduct} from '../../../../components'
import style from './ModalContent.module.sass'

type FormErrors = {
  image?: string
  coast?: string
}

const ModalContent = ({id, setIsOpen}) => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  return (
    <Formik
      initialValues={{coast: '', image: ''}}
      onSubmit={async (values, props) => {
        if (selectedProduct) {
          values['id'] = id
          values['product'] = selectedProduct
          if (values.image !== '') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            new Compressor(values.image, {
              quality: 0.5,
              success: async result => {
                const storageRef = storage.ref('/products')
                const file: any = result
                const name = id + Date.now()
                const metaData = {
                  contentType: file.type,
                }
                const task = storageRef.child(name).put(file, metaData)
                values['image'] = await task
                  .then(response => response.ref.getDownloadURL())
                  .then(url => {
                    return url
                  })
                await axios
                  .post('/api/farmer/create-product', values)
                  .then(response => {
                    console.log(response.data)
                    if (response.statusText === 'OK') setIsOpen(false)
                    Router.reload()
                  })
                  .catch(error => console.error(error))
              },
            })
          } else {
            await axios
              .post('/api/farmer/create-product', values)
              .then(response => {
                console.log(response.data)
                if (response.statusText === 'OK') setIsOpen(false)
                Router.reload()
              })
              .catch(error => console.error(error))
          }
        } else {
          props.setSubmitting(false)
          toast.error('Выберете товар')
        }
      }}
      validate={values => {
        const errors: FormErrors = {}
        if (!values.coast) errors.coast = 'Это обязательное поле'
        else if (!/^\d+$/.test(values.coast))
          errors.coast = 'Недопустимый формат'
        return errors
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className={style.select}>
            <SelectProduct
              disabled={isSubmitting}
              onChange={setSelectedProduct}
              isMulti={false}
            />
          </div>
          <div className={style.image}>
            <p>Фото товара:</p>
            <input
              type='file'
              name='image'
              accept='image/png, image/jpeg'
              onChange={event => {
                setFieldValue('image', event.currentTarget.files[0])
              }}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
            {errors.image && touched.image && errors.image}
          </div>
          <div className={style.coast}>
            <p>Цена:</p>
            <div>
              <input
                type='text'
                name='coast'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.coast}
                disabled={isSubmitting}
                placeholder='100'
              />
              <p>
                р/
                {selectedProduct && selectedProduct
                  ? selectedProduct.amount
                  : '...'}
              </p>
            </div>
            {errors.coast && touched.coast && (
              <p style={{color: '#F92801'}}>{errors.coast}</p>
            )}
          </div>
          <div className={style.button}>
            <Button text='Добавить' disabled={isSubmitting} type='submit' />
          </div>
        </form>
      )}
    </Formik>
  )
}

export default ModalContent
