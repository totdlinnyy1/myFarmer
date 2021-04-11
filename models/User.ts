import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  image: {
    type: String,
  },
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  coast: {
    type: Number,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
})

const UserSchema = new mongoose.Schema(
  {
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
    phone: {
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
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  },
  {
    timestamps: true,
  }
)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
mongoose.models = {}

export const User = mongoose.model('User', UserSchema)
export const Product = mongoose.model('Product', ProductSchema)
