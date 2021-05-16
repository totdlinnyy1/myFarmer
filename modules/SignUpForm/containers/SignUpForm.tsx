import {withFormik, FormikErrors} from 'formik'
import InnerForm from '../components/InnerForm'
import fetchJson from '../../../lib/fetchJson'

interface FormValues {
  name: string
  lastname: string
  number: string
  email: string
  password: string
  rpassword: string
  farmer: boolean | string
  access: boolean
}

interface MyFormProps {
  mutateUser: any
  toast: any
  farmer: boolean
}

const SignUpForm = withFormik<MyFormProps, FormValues>({
  validate: (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {}
    if (!values.email) {
      errors.email = 'Обязательное поле'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Email введен не верно'
    }
    if (!values.password) {
      errors.password = 'Обязательное поле'
    } else if (values.password.length < 6) {
      errors.password = 'Пароль не может быть меньше 6 символов'
    } else if (values.password.length > 16) {
      errors.password = 'Пароль не может быть больше 16 символов'
    }
    if (!values.name) {
      errors.name = 'Обязательное поле'
    } else if (!/(-?([А-Я].\s)?([А-Я][а-я]+)\s?)/g.test(values.name)) {
      errors.name = 'Некорректное имя'
    }
    if (!values.lastname) {
      errors.lastname = 'Обязательное поле'
    } else if (!/(-?([А-Я].\s)?([А-Я][а-я]+)\s?)/g.test(values.lastname)) {
      errors.lastname = 'Некорректнае фамилия'
    }
    if (!values.rpassword) {
      errors.rpassword = 'Обязательное поле'
    } else if (values.rpassword !== values.password) {
      errors.rpassword = 'Пароли не совпадают'
    }
    if (!values.number) {
      errors.number = 'Обязательное поле'
    }
    if (values.number && values.number.includes('_')) {
      errors.number = 'Номер телефона введен не верно'
    }
    if (!values.access) {
      errors.access = 'Это поле должно быть отмечено'
    }
    return errors
  },

  handleSubmit: async (values, props) => {
    if (values.farmer) {
      values['role'] = 'farmer'
    } else values['role'] = 'buyer'
    delete values['rpassword']
    delete values['access']
    try {
      await props.props.mutateUser(
        fetchJson('/api/signup', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(values),
        })
      )
    } catch (error) {
      props.setSubmitting(false)
      if (error.data) {
        props.props.toast({
          title: error.data,
          status: 'error',
          position: 'bottom-right',
        })
      }
    }
  },
})(InnerForm)

export default SignUpForm
