import { Router } from 'express'

const router = Router()
const ControllerUpload = require('../controllers/UploadController')
const uploadMulter = require('../models/ModelMulter') // khai báo middleware multer ở đây
import { sendEmail } from '../services/mailService'
import * as UserService from '../models/mongo/user.service'
import { asyncMiddleware } from '../middlewares/asyncMiddleware'

router.get('/', (req, res) => {
  res.json({ message: 'API DEV v1.0' })
})

router.get('/testAsync', asyncMiddleware(async (req, res, next) => {
    throw new Error('PES2020')
  })
)

router.post('/post-user', async (req, res) => {
  try {
    const result = await UserService.create(req.body)
    res.json({ success: true, data: result })
  } catch (e) {
    res.json({ success: false, message: e.message, error: e })
  }
})

router.get('/find-user', async (req, res) => {
  UserService.filterByName(req.query)
    .then(data => {
      res.json({ data })
    })
    .catch(e => {
      res.status(500).json({ message: e.message, error: e })
    })
})

// upload nhiều files ví dụ như hình ảnh của sản phẩm
router.post(
  '/uploadMultiple',
  uploadMulter.any(),
  ControllerUpload.uploadMultipleFiles
)

// upload single ví dụ như avatar...
router.post(
  '/uploadSingle',
  uploadMulter.single('name'),
  ControllerUpload.uploadSingleFile
)

router.post('/send-email', async (req, res) => {
  try {
    let content = `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
                <span style="color: black">Đây là mail test</span>
            </div>
        </div>`
    const mainOptions = {
      // thiết lập đối tượng, nội dung gửi mail
      from: `"Dev Ghost 👻" <${process.env.GMAIL_USER}>`, // sender address
      to: req.body.mail, // list of receivers
      subject: 'Test Nodemailer',
      html: content // Nội dung html mình đã tạo trên kia :))
    }
    let info = await sendEmail(mainOptions)
    res.json({ message: info })
  } catch (err) {
    res.json({ message: 'FAIL: ' + err })
  }
})

module.exports = router
