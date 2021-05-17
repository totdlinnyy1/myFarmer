import {FC, useState} from 'react'
import Link from 'next/link'
import {FormikProps, Form, Field} from 'formik'
import InputMask from 'react-input-mask'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Button,
  Flex,
  Switch,
  Checkbox,
} from '@chakra-ui/react'
import {BiHide, BiShow} from 'react-icons/bi'

// Shape of form values
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

interface FormProps extends FormikProps<FormValues> {
  farmer: boolean
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm: FC<FormProps> = props => {
  const {isSubmitting, farmer} = props
  const [show, setShow] = useState<boolean>(false)
  const handleClick: () => void = () => setShow(!show)
  return (
    <Form>
      <Field name='email' validate='email'>
        {({field, form}) => (
          <FormControl
            id='email'
            mb={5}
            isInvalid={form.errors.email || form.touched.email}
          >
            <FormLabel>Email:</FormLabel>
            <Input
              {...field}
              type='email'
              placeholder='example@email.com'
              disabled={isSubmitting}
              maxLength={50}
            />
            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name='name' validate='name'>
        {({field, form}) => (
          <FormControl
            id='name'
            mb={5}
            isInvalid={form.errors.name || form.touched.name}
          >
            <FormLabel>Имя:</FormLabel>
            <Input
              {...field}
              type='text'
              placeholder='Имя'
              disabled={isSubmitting}
              maxLength={50}
            />
            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name='lastname' validate='lastname'>
        {({field, form}) => (
          <FormControl
            id='lastname'
            mb={5}
            isInvalid={form.errors.lastname || form.touched.lastname}
          >
            <FormLabel>Фамилия:</FormLabel>
            <Input
              {...field}
              type='text'
              placeholder='Фамилия'
              disabled={isSubmitting}
              maxLength={50}
            />
            <FormErrorMessage>{form.errors.lastname}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name='number' validate='number'>
        {({field, form}) => (
          <FormControl
            id='number'
            mb={5}
            isInvalid={form.errors.number || form.touched.number}
          >
            <FormLabel>Номер телефона:</FormLabel>
            <InputGroup>
              <InputLeftAddon>+7</InputLeftAddon>
              <Input
                {...field}
                as={InputMask}
                mask='(999)-999-99-99'
                type='text'
                placeholder='Номер телефона'
                disabled={isSubmitting}
              />
            </InputGroup>
            <FormErrorMessage>{form.errors.number}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name='password' validate='password'>
        {({field, form}) => (
          <FormControl
            id='password'
            mb={5}
            isInvalid={form.errors.password || form.touched.password}
          >
            <FormLabel>Пароль:</FormLabel>
            <InputGroup>
              <Input
                {...field}
                type={show ? 'text' : 'password'}
                placeholder='Пароль'
                disabled={isSubmitting}
                maxLength={20}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? <Icon as={BiShow} /> : <Icon as={BiHide} />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name='rpassword' validate='rpassword'>
        {({field, form}) => (
          <FormControl
            id='rpassword'
            mb={5}
            isInvalid={form.errors.rpassword || form.touched.rpassword}
          >
            <FormLabel>Повторите пароль:</FormLabel>
            <Input
              {...field}
              type='password'
              placeholder='Повторите пароль:'
              disabled={isSubmitting}
              maxLength={20}
            />
            <FormErrorMessage>{form.errors.rpassword}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name='farmer' validate='farmer'>
        {({field}) => (
          <FormControl id='farmer' mb={5} display='flex' alignItems='center'>
            <FormLabel>Фермер?</FormLabel>
            <Switch {...field} defaultChecked={farmer} />
          </FormControl>
        )}
      </Field>
      <Field name='access' validate='access'>
        {({field, form}) => (
          <FormControl
            id='access'
            mb={5}
            isInvalid={form.errors.access || form.touched.access}
          >
            <Checkbox {...field}>
              Даю согласие на обработку персональных данных
            </Checkbox>
            <FormErrorMessage>{form.errors.access}</FormErrorMessage>
          </FormControl>
        )}
      </Field>

      <Flex align='center' justifyContent='space-between'>
        <Button
          type='submit'
          disabled={isSubmitting}
          isLoading={isSubmitting}
          size='lg'
          colorScheme='red'
        >
          Регистрация
        </Button>
        <Link href='/signin'>
          <a>
            <Button variant='link'>Уже есть аккаунт?</Button>
          </a>
        </Link>
      </Flex>
    </Form>
  )
}

export default InnerForm
