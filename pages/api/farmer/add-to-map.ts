import {FarmerMapProducts} from '../../../models'
import withSession from '../../../lib/session'
import dbConnect from '../../../utils/dbConnect'

export default withSession(async (req, res) => {
  const user = req.session.get('user')

  if (user) {
    if (req.method === 'POST') {
      const {placemark, products, owner} = JSON.parse(req.body.data)
      dbConnect()
      const result = await FarmerMapProducts.create({
        owner,
        placemark,
        products,
      })
      return res.status(200).json(result)
    }
  }
  return res.status(500).json({message: 'access denied'})
})
