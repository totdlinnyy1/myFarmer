import {Product} from '../../../models'
import withSession from '../../../lib/session'
import dbConnect from '../../../utils/dbConnect'

export default withSession(async (req, res) => {
  const user = req.session.get('user')

  if (user) {
    switch (req.method) {
      case 'POST':
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
      case 'GET':
        await dbConnect()
        const fetchedProducts = await Product.find({owner: user.id})
        return res.status(200).json(fetchedProducts)
    }
  }
  return res.status(500).json({message: 'access denied'})
})
