import withSession from '../../lib/session'
import dbConnect from '../../utils/dbConnect'

export default withSession(async (req, res) => {
  const user = req.session.get('user')
  if (user) {
    await dbConnect()
    return res.status(204).json
  }
  return res.status(500).json({message: 'access denied'})
})
