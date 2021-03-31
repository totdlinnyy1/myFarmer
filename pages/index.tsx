import {NextPage} from 'next'
import {Props} from 'next/dist/client/experimental-script'
import {Layout} from '../modules'

const IndexPage: NextPage<Props> = () => {
  return (
    <Layout title='Главная'>
      <h1>Hello</h1>
    </Layout>
  )
}
export default IndexPage
