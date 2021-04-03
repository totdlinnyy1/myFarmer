import {withFormik, FormikErrors} from 'formik'
import InnerForm from '../components/InnerForm'

interface MyFormProps {
  initialEmail?: string
}

interface FormValues {
  email: string
  password: string
}

const SignInForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      email: props.initialEmail || '',
      password: '',
    }
  },

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
    }
    return errors
  },

  handleSubmit: values => {
    console.log(values)
  },
})(InnerForm)

export default SignInForm
