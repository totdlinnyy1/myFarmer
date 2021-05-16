import {withFormik, FormikErrors} from 'formik'
import InnerForm from '../components/InnerForm'
import fetchJson from '../../../lib/fetchJson'

interface MyFormProps {
  mutateUser: any
  toast: any
}

interface FormValues {
  email: string
  password: string
}

const SignInForm = withFormik<MyFormProps, FormValues>({
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

  handleSubmit: async (values, props) => {
    try {
      await props.props.mutateUser(
        fetchJson('/api/signin', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(values),
        })
      )
    } catch (error) {
      props.setSubmitting(false)
      props.props.toast({
        title: error.data,
        status: 'error',
        position: 'bottom-right',
      })
    }
  },
})(InnerForm)

export default SignInForm
