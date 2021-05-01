import crypto from 'crypto'
import withSession from '../../lib/session'
import dbConnect from '../../utils/dbConnect'
import {User} from '../../models'

type User = {
  name?: string
  lastname?: string
  avatar?: string
  email?: string
  phone?: string
  role?: string
  _id?: string
  hash?: string
  salt?: string
}

type error = {
  status: number
  data: string
  statusText: string
}

export default withSession(async (req, res) => {
  const {email, password} = req.body

  try {
    // we check that the user exists on GitHub and store some data in session
    await dbConnect()
    const user: User = await User.findOne({email})
    if (user) {
      const inputHash = await crypto
        .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
        .toString('hex')
      if (user.hash === inputHash) {
        const session = {
          isLoggedIn: true,
          name: user.name,
          lastname: user.lastname,
          avatar: user.avatar ? user.avatar : null,
          email: user.email,
          phone: user.phone,
          role: user.role,
          id: user._id,
        }
        req.session.set('user', session)
        await req.session.save()
        res.json(user)
      } else {
        const error: error = {
          status: 404,
          data: 'Такого пользователя не существует',
          statusText: 'Input Error',
        }
        throw error
      }
    } else {
      const error: error = {
        status: 404,
        data: 'Такого пользователя не существует',
        statusText: 'Input Error',
      }
      throw error
    }
  } catch (error) {
    res.status(error?.status || 500).json(error)
  }
})
