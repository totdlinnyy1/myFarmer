import formidable, {IncomingForm} from 'formidable'
import {v2} from 'cloudinary'
import withSession from '../../lib/session'

v2.config({
  cloud_name: 'dbi6ibqgs',
  api_key: '773473969597524',
  api_secret: 'iu7br3DwpPfHkkLCLPSObwunqNc',
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default withSession(async (req, res) => {
  const user = req.session.get('user')
  if (user) {
    const data: {
      fields: formidable.Fields
      files: formidable.Files
    } = await new Promise((resolve, reject) => {
      const form = new IncomingForm()

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err)
        resolve({fields, files})
      })
    })
    if (data.files.image) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const path = data.files.image.path
      const url = await v2.uploader
        .upload(path, {
          transformation: {quality: 50},
        })
        .then(result => result.url)
      return res.status(200).json({url})
    }
  }
  return res.status(500).json({message: 'access denied'})
})
