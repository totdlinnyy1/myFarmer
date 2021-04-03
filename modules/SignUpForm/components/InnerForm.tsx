import {FormikProps, Form, Field} from 'formik'
import style from '../../../styles/components/InnerForm.module.sass'
import {Button} from '../../../components'
import Link from 'next/link'
import InputMask from 'react-input-mask'

// Shape of form values
interface FormValues {
  name: string
  lastname: string
  phone: string
  email: string
  password: string
  rpassword: string
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: FormikProps<FormValues>) => {
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
        />
      </div>
      <div className={style.error}>
        {touched.email && errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <p>Имя:</p>
        <Field
          type='text'
          name='name'
          className={style.input}
          placeholder='Имя'
        />
      </div>
      <div className={style.error}>
        {touched.name && errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <p>Фамилия:</p>
        <Field
          type='text'
          name='lastname'
          className={style.input}
          placeholder='Фамилия'
        />
      </div>
      <div className={style.error}>
        {touched.lastname && errors.lastname && <p>{errors.lastname}</p>}
      </div>
      <div>
        <p>Номер телефона:</p>
        <Field
          name='phone'
          render={({field}) => (
            <InputMask
              {...field}
              mask='+7(999)-999-99-99'
              className={style.input}
              placeholder='Номер телефона'
            />
          )}
        />
      </div>
      <div className={style.error}>
        {touched.phone && errors.phone && <p>{errors.phone}</p>}
      </div>
      <div>
        <p>Пароль:</p>
        <Field
          type='password'
          name='password'
          className={style.input}
          placeholder='Пароль'
        />
      </div>
      <div className={style.error}>
        {touched.password && errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <p>Повторите пароль:</p>
        <Field
          type='password'
          name='rpassword'
          className={style.input}
          placeholder='Повторите пароль'
        />
      </div>
      <div className={style.error}>
        {touched.rpassword && errors.rpassword && <p>{errors.rpassword}</p>}
      </div>

      <div className={style.button}>
        <Button
          text='Заргестрироваться'
          type='submit'
          disabled={isSubmitting}
        />
        <Link href='/signin'>
          <a>Уже есть аккаунт?</a>
        </Link>
      </div>
    </Form>
  )
}

export default InnerForm
