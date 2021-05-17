import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  await req.session.destroy('user')
  res.json({isLoggedIn: false})
})
