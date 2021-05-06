import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
mongoose.models = {}

const Product = mongoose.model('Product', ProductSchema)

export default Product
