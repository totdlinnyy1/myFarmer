import {NextPage} from 'next'

import useUser from '../../lib/useUser'
import {Layout} from '../../modules'
import {Box, Container, Divider} from '@chakra-ui/react'
import {ProfileComponent} from '../../components'
import role from '../../helpers/role'

interface ProfileProps {
  fetchedProducts: string
  fetchedMapProducts: string
}

const Profile: NextPage<ProfileProps> = () => {
  const {user} = useUser({redirectTo: '/signin'})

  if (!user || user.isLoggedIn === false) {
    return <Layout title='loading...' loading={true} />
  }

  return (
    <Layout title='Профиль' loading={false}>
      <Container maxW='container.xl' bg='white'>
        <Box p='20px 0'>
          <ProfileComponent
            name={user.name}
            lastname={user.lastname}
            avatar={user.avatar}
            role={role(user.role)}
            number={user.number}
          />
        </Box>
        <Divider />
        <Box p='100px 0'></Box>
      </Container>
      {/*<div>*/}
      {/*  <div>*/}
      {/*    <ProfileComponent*/}
      {/*      name={user.name}*/}
      {/*      lastname={user.lastname}*/}
      {/*      avatar={user.avatar}*/}
      {/*      editable={true}*/}
      {/*      role={role(user.role)}*/}
      {/*      color='#fff'*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    {isFarmer(user.role) ? null : (*/}
      {/*      <ProfileBuyerMap MapObjects={JSON.parse(fetchedMapProducts)} />*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*  {isFarmer(user.role) && (*/}
      {/*    <div>*/}
      {/*      <FarmerTable mapProducts={JSON.parse(fetchedMapProducts)} />*/}
      {/*      <CreateProduct*/}
      {/*        id={user.id}*/}
      {/*        fetchedProducts={JSON.parse(fetchedProducts)}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</div>*/}
    </Layout>
  )
}

// export const getServerSideProps: GetServerSideProps = withSession(
//   async function ({req}) {
//     const user = req.session.get('user')
//     await dbConnect()
//     if (user) {
//       if (isFarmer(user.role)) {
//         const fetchedProducts = await Product.find({owner: user.id})
//         const fetchedMapProducts = await FarmerMapProducts.find({
//           owner: user.id,
//         }).populate({path: 'products.product', model: Product})
//         return {
//           props: {
//             fetchedProducts: JSON.stringify(fetchedProducts),
//             fetchedMapProducts: JSON.stringify(fetchedMapProducts),
//           },
//         }
//       }
//       const fetchedMapProducts = await FarmerMapProducts.find().populate([
//         {
//           path: 'products.product',
//           model: Product,
//         },
//         {
//           path: 'owner',
//           model: User,
//           select: ['name', 'lastname', 'avatar'],
//         },
//       ])
//
//       return {
//         props: {
//           fetchedMapProducts: JSON.stringify(fetchedMapProducts),
//           fetchedProducts: JSON.stringify(null),
//         },
//       }
//     }
//     return {
//       props: {isLoggedIn: JSON.stringify(false)},
//     }
//   }
// )

export default Profile
