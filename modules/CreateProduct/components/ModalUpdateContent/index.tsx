import axios from 'axios'
import {Formik} from 'formik'
import {FaRegTrashAlt} from 'react-icons/fa'
import {Button} from '../../../../components'
import style from './ModalUpdateContent.module.sass'

type FormErrors = {
  coast?: string
}

const ModalUpdateContent = ({product, setIsOpen, fetchData}) => {
  const handleDelete = async () =>
    axios
      .delete('/api/farmer/product', {data: {id: product._id}})
      .then(response => {
        if (response.status === 204) {
          setIsOpen(false)
          fetchData()
        }
      })

  return (
    <Formik
      initialValues={{coast: product.coast}}
      onSubmit={async (values, props) => {
        values['id'] = product._id
        await axios
          .put('/api/farmer/product', {values})
          .then(response => {
            if (response.status === 200) {
              setIsOpen(false)
              fetchData()
            }
          })
          .catch(() => props.setSubmitting(false))
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
      }) => (
        <form onSubmit={handleSubmit}>
          <div className={style.title}>
            <p>{product.label}</p>
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
                {product.amount}
              </p>
            </div>
            {errors.coast && touched.coast && (
              <p style={{color: '#F92801'}}>{errors.coast}</p>
            )}
          </div>
          <div className={style.button}>
            <Button text='Изменить' disabled={isSubmitting} type='submit' />
            <div>
              <FaRegTrashAlt size={24} onClick={handleDelete} />
            </div>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default ModalUpdateContent
