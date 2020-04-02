import { Router } from 'express'
const nodemailer = require('nodemailer')

const router = Router()
const { getTodoList } = require('../controllers/TodoController')
const ControllerUpload  = require('../controllers/UploadController')
const uploadMulter = require('../models/ModelMulter') // khai báo middleware multer ở đây

router.get('/', (req, res) => {
  res.json({ message: 'API v1.0' })
})

router.get('/todos', getTodoList)

// upload nhiều files ví dụ như hình ảnh của sản phẩm
router.post('/uploadMultiple', uploadMulter.any(), ControllerUpload.uploadMultipleFiles)

// upload single ví dụ như avatar...
router.post('/uploadSingle', uploadMulter.single('name'), ControllerUpload.uploadSingleFile)

router.get('/images', ControllerUpload.getImages)


/**
 * Thiết lập bảo mật cho gmail để có thể gửi mail:
 * - Cho phép các ứng dụng bảo mật thấp truy cập: Vì bảo mật nên gmail sẽ mặc định cái này bị tắt! https://myaccount.google.com/?utm_source=OGB&tab=rk&utm_medium=act  -> Chọn mục security: Tìm đến mục Less secure app access -> Turn on
 * - Đặt quyền truy cập IMAP: Vào gmail của bạn, chọn nút setting trên góc phải màn hình -> chọn Forwarding and POP/IMAP, tìm đến mục IMAP access Enable IMAP
 */
router.post('/send-email', async (req, res) => {
  try {
    let senderMail = process.env.GMAIL_USER || 'example@gmail.com'
    const transporter =  nodemailer.createTransport({ // config mail server
      host: process.env.GMAIL_HOST || 'smtp.gmail.com',
      port: process.env.GMAIL_PORT || 465, // 587 là một cổng tiêu chuẩn và phổ biến trong giao thức SMTP
      secure: true, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
      auth: {
          user: senderMail, //Tài khoản gmail vừa tạo
          pass: process.env.GMAIL_PASSWORD || 'example' //Mật khẩu tài khoản gmail vừa tạo
      },
      tls: {        
          rejectUnauthorized: false // do not fail on invalid certs
      }
    })
    let content = ''
    content += `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
                <span style="color: black">Đây là mail test</span>
            </div>
        </div>`
    const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: `"Dev 👻" <${senderMail}>`, // sender address
        to: req.body.mail, // list of receivers
        subject: 'Test Nodemailer',
        html: content // Nội dung html mình đã tạo trên kia :))
    }
    let info = await transporter.sendMail(mainOptions)
    res.json({ message: info })
  } catch (err) { 
    res.json({ message: 'Message fail: ' +  err })
  }
})

module.exports = router
