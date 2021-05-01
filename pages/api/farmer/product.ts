import {Product} from '../../../models'
import withSession from '../../../lib/session'
import dbConnect from '../../../utils/dbConnect'

export default withSession(async (req, res) => {
  const user = req.session.get('user')

  if (user) {
    if (req.method === 'POST') {
      const {id, coast, image, product} = req.body
      await dbConnect()
      const createdProduct = await Product.create({
        owner: id,
        image,
        coast,
        value: product.value,
        label: product.label,
        amount: product.amount,
        class: product.class,
      })
      return res.status(200).json(createdProduct)
    }
    if (req.method === 'GET') {
      await dbConnect()
      const fetchedProducts = await Product.find({owner: user.id})
      return res.status(200).json(fetchedProducts)
    }
    if (req.method === 'PUT') {
      const {id, coast} = req.body.values
      const updatedProduct = await Product.findByIdAndUpdate(id, {coast})
      return res.status(200).json(updatedProduct)
    }
    if (req.method === 'DELETE') {
      const _id = req.body.id
      await Product.findOneAndDelete({_id})
      return res.status(204).json()
    }
  }
  return res.status(500).json({message: 'access denied'})
})
