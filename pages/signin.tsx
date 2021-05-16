import {NextPage} from 'next'
import {Props} from 'next/dist/client/experimental-script'
import {Layout, SignInForm} from '../modules'
import useUser from '../lib/useUser'
import {Box, Center, Container, Heading, useToast} from '@chakra-ui/react'

const SignIn: NextPage<Props> = () => {
  const {user, mutateUser} = useUser({
    redirectTo: '/profile',
    redirectIfFound: true,
  })

  const toast = useToast()

  if (user && user.isLoggedIn) {
    return <Layout title='loading...' loading={true} />
  }

  return (
    <Layout title='Вход' loading={false}>
      <Container>
        <Center h='700px'>
          <Box bg='white' p={10} minWidth='270px' width='100%'>
            <Box textAlign='center' mb={10}>
              <Heading as='h4'>Вход</Heading>
            </Box>
            <Box>
              <SignInForm mutateUser={mutateUser} toast={toast} />
            </Box>
          </Box>
        </Center>
      </Container>
    </Layout>
  )
}

export default SignIn
