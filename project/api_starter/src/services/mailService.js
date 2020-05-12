import nodemailer from 'nodemailer'
import CONFIG from '../config'

let mailSender = process.env.GMAIL_USER || CONFIG.gmail.user

const transporter = nodemailer.createTransport({
  // config mail server
  host: process.env.GMAIL_HOST || CONFIG.gmail.host,
  port: process.env.GMAIL_PORT || CONFIG.gmail.port, // 587 là một cổng tiêu chuẩn và phổ biến trong giao thức SMTP
  secure: CONFIG.gmail.secure, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
  auth: {
    user: mailSender, //Tài khoản gmail vừa tạo
    pass: process.env.GMAIL_PASSWORD || CONFIG.gmail.password //Mật khẩu tài khoản gmail vừa tạo
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
