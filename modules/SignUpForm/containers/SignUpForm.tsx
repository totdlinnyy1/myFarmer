import {withFormik, FormikErrors} from 'formik'
import InnerForm from '../components/InnerForm'

interface FormValues {
  name: string
  lastname: string
  phone: string
  email: string
  password: string
  rpassword: string
}

interface MyFormProps {
  role: string
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
      errors.password = 'Парольдолжен не может быть меньше 6 символов'
    } else if (values.password.length > 12) {
      errors.password = 'Парольдолжен не может быть больше 12 символов'
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
    if (!values.phone) {
      errors.phone = 'Обязательное поле'
    } else if (values.phone.length !== 17) {
      errors.phone = 'Номер введен неккоректно'
    }
    return errors
  },

  handleSubmit: values => {
    console.log(values)
  },
})(InnerForm)

export default SignUpForm
