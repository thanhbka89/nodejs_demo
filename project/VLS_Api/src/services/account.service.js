import jwt from 'jsonwebtoken'

import Account from '@src/models/account.model'
import CONFIG from '@src/config'
import { publishToQueue } from './queueService'
import * as RedisService from '@src/services/redisService'
import { sendEmail } from '@src/services/mailService'
import { randomIntegerInRange } from '@src/helpers/utils'
import {
  KEY_ACCOUNT_DETAIL,
  KEY_ACCOUNT_RESET_PASSWD,
  KEY_REFRESH_TOKEN,
  KEY_ACCOUNT_OTP
} from '@src/constants/redis'
import { QUEUE_USER_UPDATE, QUEUE_USER_LOGIN } from '@src/constants/queue'

export const find = async (filter = {}, projection = {}, options = {}) => {
  return Account.find(filter, projection, options).cache({ expire: 3600, lean: true })
}

export const paginate = async (query = {}, options = {}) => {
  return Account.paginate(query, options)
}

export const getAll = async () => {
  return find()
}

export const filterByName = async (query = {}) => {
  const { fullname } = query
  let condition = fullname
    ? { fullname: { $regex: new RegExp(fullname), $options: 'i' } }
    : {}

  return find(condition)
}

export const getById = async (id, projection = {}, options = {}) => {
  return Account.findById(id, projection, options) // .cache({ key:`${KEY_ACCOUNT_DETAIL + id}`, expire: 3600 })
}

export const findOne = async (query = {}, projection = {}, options = {}) => {
  return Account.findOne(query, projection, options)
}

export const create = async (data = {}) => {
  return Account.create(data)
}

export async function update(id, data) {
  const user = await getById(id)
  if (!user) throw new Error('User not found')
  if (
    user.email !== data.email &&
    (await findOne({ email: data.email }))
  )
    throw new Error('Email "' + data.email + '" is already taken')

  Object.assign(user, data) // copy userParam properties to user

  return user.save()
}

export async function modify(filter = {}, data) {
  const user = await findOne(filter)
  if (!user) {
    create(data)
    return { message: 'Created', _id: 1 }
  }

  Object.assign(user, data) // copy userParam properties to user

  await user.save()
  return { message: 'Updated', _id: user._id }
}

export const findByIdAndUpdate = async (id, data = {}, options = {}) => {
  return Account.findByIdAndUpdate(id, data, options)
}

export const _delete = async (id) => {
  return Account.findByIdAndRemove(id)
}

export const _deleteSoft = async (id) => {
  return findByIdAndUpdate(id, { active: false })
}

/** List product are created by userid
 * @param(required) id(String): userId
 * @param           query.active: true|false
 * @param           query.sortBy: fieldname
 * @param           query.OrderBy: desc
 * @param           query.limit
 * @param           query.skip
 */
export const getProductBy = async (id, query = {}) => {
  const match = {}
  const sort = {}
  if (query.active) match.active = query.active === 'true'
  if (query.sortBy && query.OrderBy)
    sort[query.sortBy] = query.OrderBy === 'desc' ? -1 : 1

  const options = {
    limit: parseInt(query.limit) || 5,
    skip: parseInt(query.skip) || 0,
    sort,
  }
  const user = await getById(id)

  return user
    .populate({
      path: 'products',
      match,
      options,
    })
    .execPopulate()
}

export const authenticate = async (email, password) => {
  const response = {
    success: false,
    message: 'Incorrect username or password | User not active, confirmed',
    data: null,
  }
  publishToQueue(QUEUE_USER_LOGIN, { username: email, password })
  try {
    const user = await findOne({ email })

    if (user && user.active && user.confirmed) {
      const match = user.comparePassword(password)
      if (match) {
        const payload = { userId: user._id, email, role: user.role }
        const token = generateToken(
          payload,
          CONFIG.secret,
          CONFIG.accessTokenLife
        )
        const refreshToken = generateToken(
          payload,
          CONFIG.refreshToken.secret,
          CONFIG.refreshToken.expire
        )

        publishToQueue(QUEUE_USER_UPDATE, {
          id: user._id,
          accessToken: token,
          refreshToken,
        })

        response.success = true
        response.token = token
        response.refreshToken = refreshToken
        delete response.message
      }
    }
  } catch (e) {
    response.message = e.message
    response.data = e
  }

  return response
}
/** create token JWT
 * @object payload
 * @string secret
 * @any expire = 60, "2 days", "10h", "7d" on zeit/ms
 */
export const generateToken = (
  payload = {},
  secret = 'iamsecret',
  expire = 1800
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: expire,
  })

  return token
}

export const getRefreshToken = async (refreshToken) => {
  const response = {
    success: false,
    token: null,
  }  

  if (refreshToken) {    
    const decoded = jwt.verify(refreshToken, CONFIG.refreshToken.secret)
    delete decoded.iat
    delete decoded.exp

    const key = `${KEY_REFRESH_TOKEN + decoded.userId}:${refreshToken}`
    const result = await RedisService.get(key)
    if (!result) return response

    const accessToken = generateToken(
      decoded,
      CONFIG.secret,
      CONFIG.accessTokenLife
    )
    publishToQueue(QUEUE_USER_UPDATE, {
      id: decoded.userId,
      accessToken,
      refreshToken,
    })
    response.success = true
    response.token = accessToken
  }

  return response
}

export const changePassword = async (email, password, new_password) => {
  const response = {
    success: false,
    message: 'fail',
  }

  const { success, data } = await auth(email, password)
  if (success) {
    response.success = true
    response.message = 'OK'
    findByIdAndUpdate(data._id, { password: new_password })
  }

  return response
}

export const auth = async (email, password) => {
  const response = {
    success: false,
    data: null,
  }

  try {
    const user = await findOne({ email })
    if (user && user.comparePassword(password)) {
      response.success = true
      response.data = user
    }
  } catch (e) {
    console.error('[AUTH_ERR]', e)
  }

  return response
}

export const forgetPassword = async (email, host) => {
  const response = {
    success: false,
    message: 'fail',
  }

  try {
    const user = await findOne({ email })
    if (user) {
      const uid = user._id + randomIntegerInRange(999, 99999)
      const key = KEY_ACCOUNT_RESET_PASSWD + uid
      const link = `${host + uid}`
      RedisService.set(key, user.id)
      RedisService.expire(key, 300) // 5 minutes
      sendEmailResetPassword(email, link)
      response.success = true
      response.message = 'OK'
      response.resetToken = uid
    }
  } catch (e) {
    console.error('[RESETPASSWD_ERR]', e)
  }

  return response
}

export const resetPassword = async (uid, password) => {
  const response = {
    success: false,
    message: 'fail',
  }
  const key = KEY_ACCOUNT_RESET_PASSWD + uid
  let userId = await RedisService.get(key)
  if (!userId) return response

  try {
    const user = await getById(userId)
    if (user) {
      findByIdAndUpdate(userId, { password })
      response.success = true
      response.message = 'OK'
    }
  } catch (e) {
    console.error('[RESETPASSWD_ERR]', e)
    response.message = e.message
  }

  return response
}

const sendEmailResetPassword = async (email, link) => {
  let content = `
  <div style="padding: 10px;>
      <div style="padding: 10px; background-color: white;">
          <h4 style="color: #0085ff">Khôi phục mật khẩu</h4>
          <span style="color: black">Truy cập link này để đổi mật khẩu mới (link sẽ hết hạn trong 5 phút)</span>
          <p><a href="${link}">${link}</a></p>
      </div>
  </div>`
  const mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: `VietLacSo.com <${process.env.GMAIL_USER}>`, // sender address
    to: email, // list of receivers, seperate `,`
    subject: 'Reset password',
    html: content, // Nội dung html mình đã tạo trên kia :))
  }
  let info = await sendEmail(mainOptions)
}

export const sendEmailConfirmedAccount = async (user) => {
  const otp = user.id + randomIntegerInRange(1000, 9999)
  const key = KEY_ACCOUNT_OTP + otp
  const link = `${host + uid}`
  RedisService.set(key, user.id)
  RedisService.expire(key, 300) // 5 minutes
  let html = `
  <div style="padding: 10px;>
      <div style="padding: 10px; background-color: white;">
          <h4 style="color: #0085ff">Khôi phục mật khẩu</h4>
          <span style="color: black">Truy cập link này để đổi mật khẩu mới (link sẽ hết hạn trong 5 phút)</span>
          <p><a href="${link}">${link}</a></p>
      </div>
  </div>`
  const mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: `VietLacSo.com <${process.env.GMAIL_USER}>`, // sender address
    to: user.email, // list of receivers, seperate `,`
    subject: 'Confirm Account',
    html: html, // Nội dung html mình đã tạo trên kia :))
  }
  let info = await sendEmail(mainOptions)
}
