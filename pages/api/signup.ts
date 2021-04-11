import crypto from 'crypto'
import withSession from '../../lib/session'
import dbConnect from '../../utils/dbConnect'
import {User} from '../../models/User'

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
  const {email, password, role, name, lastname, phone} = await req.body

  try {
    // we check that the user exists on GitHub and store some data in session
    await dbConnect()
    const userExist = await User.findOne({email})
    if (!userExist) {
      const salt = await crypto.randomBytes(16).toString('hex')
      const hash = await crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex')
      const user = new User({email, name, lastname, phone, role, hash, salt})
      const task: User = await user.save()
      const session = {
        isLoggedIn: true,
        name: task.name,
        lastname: task.lastname,
        email: task.email,
        phone: task.phone,
        role: task.role,
        id: task._id,
        avatar: task.avatar ? task.avatar : null,
      }
      req.session.set('user', session)
      await req.session.save()
      res.json(session)
    } else {
      const error: error = {
        status: 409,
        data: 'Такой пользователь уже существует',
        statusText: 'Already Exists',
      }
      throw error
    }
  } catch (error) {
    res.status(error?.status || 500).json(error)
  }
})
