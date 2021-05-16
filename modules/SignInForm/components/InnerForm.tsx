import {FormikProps, Form, Field} from 'formik'
import Link from 'next/link'
import {FC, useState} from 'react'
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  FormErrorMessage,
  InputRightElement,
  Icon,
  InputGroup,
  Flex,
} from '@chakra-ui/react'
import {BiShow, BiHide} from 'react-icons/bi'

interface FormValues {
  email: string
  password: string
}

const InnerForm: FC<FormikProps<FormValues>> = props => {
  const {isSubmitting} = props
  const [show, setShow] = useState<boolean>(false)
  const handleClick: () => void = () => setShow(!show)
  return (
    <Form>
      <Field name='email' validate='email'>
        {({field, form}) => (
          <FormControl
            id='email'
            mb={5}
            isInvalid={form.errors.email && form.touched.email}
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
      <Field name='password' validate='password'>
        {({field, form}) => (
          <FormControl
            id='password'
            mb={5}
            isInvalid={form.errors.password && form.touched.password}
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

      <Flex align='center' justifyContent='space-between'>
        <Button
          type='submit'
          colorScheme='red'
          isLoading={isSubmitting}
          disabled={isSubmitting}
          size='lg'
        >
          Войти
        </Button>
        <Link href='/'>
          <a>
            <Button variant='link'>Забыли пароль?</Button>
          </a>
        </Link>
      </Flex>
    </Form>
  )
}

export default InnerForm
