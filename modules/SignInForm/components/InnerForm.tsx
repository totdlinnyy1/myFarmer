import {FormikProps, Form, Field} from 'formik'
import style from '../../../styles/components/InnerForm.module.sass'
import {Button} from '../../../components'
import {FC} from 'react'

// Shape of form values
interface FormValues {
  email: string
  password: string
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm: FC<FormikProps<FormValues>> = props => {
  const {touched, errors, isSubmitting} = props
  return (
    <Form className={style.form}>
      <div>
        <p>Email:</p>
        <Field
          type='text'
          name='email'
          className={style.input}
          placeholder='example@email.com'
          disabled={isSubmitting}
        />
      </div>
      <div className={style.error}>
        {touched.email && errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <p>Пароль:</p>
        <Field
          type='password'
          name='password'
          className={style.input}
          placeholder='Пароль'
          disabled={isSubmitting}
        />
      </div>
      <div className={style.error}>
        {touched.password && errors.password && <p>{errors.password}</p>}
      </div>

      <div className={style.loginButton}>
        <Button text='Войти' type='submit' disabled={isSubmitting} />
      </div>
    </Form>
  )
}

export default InnerForm
