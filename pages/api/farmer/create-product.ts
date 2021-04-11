import {Product, User} from '../../../models/User'
import withSession from '../../../lib/session'
import dbConnect from '../../../utils/dbConnect'

export default withSession(async (req, res) => {
  const user = req.session.get('user')

  if (user) {
    const {id, coast, image, product} = req.body
    await dbConnect()
    console.log(req.body)
    const createdProduct = await Product.create({
      owner: await User.findOne({_id: id}),
      image,
      coast,
      value: product.value,
      label: product.label,
      amount: product.amount,
      class: product.class,
    })
    const updatedUser = await User.findByIdAndUpdate(id, {
      $push: {products: createdProduct},
    })
    return res.status(200).json(updatedUser)
  }
  return res.status(500).json({message: 'access denied'})
})
