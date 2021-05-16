import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {Props} from 'next/dist/client/experimental-script'
import {Box, Center, Container, Heading, useToast} from '@chakra-ui/react'
import useUser from '../lib/useUser'
import {Layout, SignUpForm} from '../modules'

const SignUp: NextPage<Props> = () => {
  const {user, mutateUser} = useUser({
    redirectTo: '/profile',
    redirectIfFound: true,
  })
  const router = useRouter()

  const tost = useToast()

  if (user && user.isLoggedIn) {
    return <Layout title='loading...' loading={true} />
  }
  const query = router.query.farmer && router.query.farmer === 'true'

  return (
    <Layout title='Регистрация' loading={false}>
      <Container>
        <Center>
          <Box bg='white' p={10} minWidth='270px' width='100%'>
            <Box textAlign='center' mb={10}>
              <Heading as='h4'>Регистрация</Heading>
            </Box>
            <Box>
              <SignUpForm mutateUser={mutateUser} toast={tost} farmer={query} />
            </Box>
          </Box>
        </Center>
      </Container>
    </Layout>
  )
}

export default SignUp
