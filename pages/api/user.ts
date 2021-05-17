import withSession from '../../lib/session'
import {User} from '../../models'
import dbConnect from '../../utils/dbConnect'

type User = {
  name?: string
  lastname?: string
  avatar?: string
  _id?: string
}
export default withSession(async (req, res) => {
  const user = req.session.get('user')
  console.log(user)
  if (user && user.id) {
    await dbConnect()
    const dbUser: User = await User.findById(user.id)
    if (dbUser) {
      user['avatar'] =
        user.avatar && user.avatar === dbUser.avatar
          ? user.avatar
          : dbUser.avatar
      user['name'] = user.name === dbUser.name ? user.name : dbUser.name
      user['lastname'] =
        user.lastname === dbUser.lastname ? user.lastname : dbUser.lastname
      res.json({
        isLoggedIn: true,
        ...user,
      })
    }
  } else {
    res.json({
      isLoggedIn: false,
    })
  }
})
