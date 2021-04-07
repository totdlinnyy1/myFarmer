import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  addresses: {
    type: String,
  },
  acceptedOrders: {},
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
mongoose.models = {}

const User = mongoose.model('User', UserSchema)

export default User
