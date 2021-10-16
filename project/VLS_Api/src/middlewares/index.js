import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'

import CONFIG from '@src/config'
import cronjob from '@src/jobs'
import { DBMongo } from '@src/models/mongo'
import { setupQueue } from '@src/services/queueService'
import { setupRedis } from '@src/services/redisService'

import AclService from '@src/models/mongo/acl.service'
import * as RedisService from '@src/services/redisService'
import { KEY_SESSION } from '@src/constants/redis'
import { roles } from '@src/roles'

export const init = () => {
  setupRedis()
  setupQueue().catch((e) =>
    console.error(`[QUEUE_ERR]: ${e.message}. Check config Url connecttion!`)
  )
  cronjob()
  new DBMongo() // Check connect to MongoDB, if not set the comand connect then not save to db
}

/** validate access-token v1 callback */
export const checkTokenJWT = (req, res, next) => {
  let data = {
    success: false,
    message: 'Auth token is not supplied',
  }
  
  let token = req.headers['x-access-token'] || req.headers['authorization'] // Express headers are auto converted to lowercase
  if (!token) return res.status(401).json(data)

  token = token.split(' ')[1]
  if (token) {
    jwt.verify(token, CONFIG.secret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid',
        })
      } else {
        // check session in Redis ?
        const session = await RedisService.get(
          `${KEY_SESSION + decoded.userId}`
        )
        if (!session)
          return res.status(401).json({
            success: false,
            message: 'Session is not valid',
          })
        req.decoded = decoded
        // req.body.updated_by = decoded.username || null
        next()
      }
    })
  } else {
    return res.status(401).json(data)
  }
}

/** validate access-token v2 async/await */
export const asyncCheckTokenJWT = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer', '').trim()

    const decoded = jwt.verify(token, CONFIG.secret)
    const session = await RedisService.get(`${KEY_SESSION + decoded.userId}`)
    if (!session) throw new Error(`Session is not valid`)

    req.token = token
    req.decoded = decoded

    next()
  } catch (err) {
    res.status(401).send({ success: false, message: 'Please authenticate!' })
  }
}

/** validate access-token v3 async/await */
export const isAuth = async (req, res, next) => {
  // Lấy token được gửi lên từ phía client, thông thường tốt nhất là các bạn nên truyền token vào header
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.headers['authorization']
  if (token) {
    try {
      // Thực hiện giải mã token xem có hợp lệ hay không?
      const decoded = jwt.verify(token, CONFIG.secret)
      // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
      req.decoded = decoded

      // check session is valid in Redis
      const session = await RedisService.get(`${KEY_SESSION + decoded.userId}`)
      if (!session) throw new Error(`Session is invalid`)

      next() // Cho phép req đi tiếp sang controller.
    } catch (error) {
      // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc
      return res.status(401).json({ success: false, message: 'Unauthorized.' })
    }
  } else {
    return res
      .status(403)
      .send({ success: false, message: 'No token provided.' })
  }
}

/** check permission */
export const checkForPermissions = (req, res, next) => {
  if (req.decoded) {
    AclService.isAllowed(
      req.decoded.userId.toString(),
      req.url,
      req.method.toLowerCase()
    )
      .then((allowed) => {
        if (allowed) {
          next()
        } else {
          res.status(403).json({ message: 'Insufficient permissions to access resource' })
        }
      })
      .catch((err) => {
        res.json(err)
      })
  } else res.json('Not authenticate!')
}

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message:
    'Too many accounts created from this IP, please try again after an hour',
  handler: function (req, res, /*next*/) {
    return res.status(429).json({
      message: 'You sent too many requests. Please wait a while then try again'
    })
  }
})

/** Middleware validate schema Joi
 * @schema: Joi
 * @property: body|query|params of req
 */
export const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property])
    const valid = error == null
    if (valid) {
      next()
    } else {
      const { details } = error
      const message = details.map((i) => i.message).join(',')
      // res.status(422).json({ error: message })
      throw new Error(message)
    }
  }
}

/** AccessControl RBAC & ABAC */
export const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {      
      const currentUserRole = req.decoded.role
      console.log('role:action:resource', currentUserRole, action, resource)
      console.log('AccessControl:', roles.getGrants())
      console.log('has resource:', roles.hasResource('banana'))
      const permission = roles.can(currentUserRole)[action](resource) // roles.can(req.user.role)[action](resource)
      console.log(permission.granted) // —> true
      console.log(permission.attributes) // —> ['*'] (all attributes)
      console.log(permission.filter({id: '123', title: 'thanhbka'}))
      
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        })
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

// export const allowIfLoggedin = async (req, res, next) => {
//   try {
//     const user = req.decoded
//     if (!user)
//       return res.status(401).json({
//         error: 'You need to be logged in to access this route',
//       })
//     req.user = user
//     next()
//   } catch (error) {
//     next(error)
//   }
// }

/** https://dev.to/sateeshm/user-role-management-in-nodejs-express-mongodb-58mp */
export const authenticateRole = (roleArray) => (req, res, next) => {
  if (!req.decoded) {
    return res.status(403).json({
      message: 'Session expired',
      code: 'SESSION_EXPIRED',
    })
  }
  //if user has a role that is required to access any API
  if(!roleArray.includes(req.decoded.role)) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

  next()  
}

/** Not found error handler */
export const notFound = (req, res) => {
  res
    .status(404)
    .json({ message: `${req.method} ${req.originalUrl} not found` })
}

/** catch async errors */
export const catchErrorsAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res)
    } catch (err) {
      next(err)
    }
  }
}

/** default error handler */
export const logErrors = (err, req, res, next) => {
  res.status(err.status || 500).json({ success: false, message: err.message })
}
