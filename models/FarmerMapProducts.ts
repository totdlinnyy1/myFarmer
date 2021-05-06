import mongoose from 'mongoose'

const FarmerMapProductSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    placemark: {
      type: [
        {
          coordinates: {
            type: [Number],
            required: true,
          },
          address: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          count: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
    status: {
      type: 'string',
      required: true,
      default: 'show',
    },
  },
  {
    timestamps: true,
  }
)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
mongoose.models = {}

const FarmerMapProduct = mongoose.model(
  'FarmerMapProduct',
  FarmerMapProductSchema
)

export default FarmerMapProduct
