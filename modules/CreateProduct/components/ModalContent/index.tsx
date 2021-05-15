import {FC, useState} from 'react'
import axios from 'axios'
import {Formik} from 'formik'
import {toast} from 'react-hot-toast'
import {Button, SelectProduct} from '../../../../components'
import style from './ModalContent.module.sass'

type FormErrors = {
  image?: string
  coast?: string
}

interface ModalContent {
  id: string
  setIsOpen: (isOpen: boolean) => void
  fetchData: () => void
}

const ModalContent: FC<ModalContent> = ({id, setIsOpen, fetchData}) => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  return (
    <Formik
      initialValues={{coast: '', image: ''}}
      onSubmit={async (values, props) => {
        if (selectedProduct) {
          if (values.image !== '') {
            const formData = new FormData()
            formData.append('image', values.image)
            console.log(formData)
            await axios
              .post('/api/upload-image', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then(response => {
                values['image'] = response.data.url
              })
              .catch(console.error)
          }
          values['id'] = id
          values['product'] = selectedProduct
          await axios
            .post('/api/farmer/product', values)
            .then(response => {
              if (response.status === 200) {
                setIsOpen(false)
                fetchData()
              }
            })
            .catch(error => {
              console.error(error)
              toast.error('Что-то пошло не так')
            })
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
