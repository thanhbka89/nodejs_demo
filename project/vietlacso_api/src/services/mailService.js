import nodemailer from 'nodemailer'

let mailSender = process.env.GMAIL_USER || 'example@gmail.com'

const transporter = nodemailer.createTransport({
  // config mail server
  host: process.env.GMAIL_HOST || 'smtp.gmail.com',
  port: process.env.GMAIL_PORT || 587, // 587 là một cổng tiêu chuẩn và phổ biến trong giao thức SMTP
  secure: false, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
  auth: {
    user: mailSender, //Tài khoản gmail vừa tạo
    pass: process.env.GMAIL_PASSWORD || 'example' //Mật khẩu tài khoản gmail vừa tạo
  },
  tls: {
    rejectUnauthorized: false // do not fail on invalid certs
  }
})

export const sendEmail = async (options = {}) => {
  let message = ''
  try {
    const result = await transporter.sendMail(options)
    message = result
  } catch (e) {
    message = e
  }

  return { message }
}
