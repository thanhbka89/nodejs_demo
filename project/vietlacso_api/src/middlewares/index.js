import jwt from 'jsonwebtoken'
import CONFIG from '../config'

/** validate access-token */
export const checkTokenJWT = (req, res, next) => {
  let data = {
    success: false,
    message: 'Auth token is not supplied',
  }
  let token = req.headers['x-access-token'] || req.headers['authorization'] // Express headers are auto converted to lowercase
  if (!token) return res.status(401).json(data)

  token = token.split(' ')[1]
  if (token) {
    jwt.verify(token, CONFIG.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid',
        })
      } else {
        req.decoded = decoded
        // req.body.updated_by = decoded.username || null
        next()
      }
    })
  } else {
    return res.status(401).json(data)
  }
}

/** Not found error handler */
export const notFound = (req, res) => {
  res.status(404).json({ message: `${req.method} ${req.originalUrl} not found` })
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
