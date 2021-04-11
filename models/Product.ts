import mongoose from 'mongoose'

const OwnerSchema = new mongoose.Schema({
  id: {
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
  avatar: {
    type: String,
    required: true,
  },
})

const ProductSchema = new mongoose.Schema({
  owner: {
    type: OwnerSchema,
    required: true,
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
  count: {
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
mongoose.models = {}

const Product = mongoose.model('Product', ProductSchema)

export default Product
