import { Router } from 'express'

import * as RedisService from '@src/services/redisService'
import * as AccountService from '@src/services/account.service'
import { validateAccount } from '@src/helpers/validate'
import { catchErrorsAsync, validator } from '@src/middlewares'
import { KEY_SESSION } from '@src/constants/redis'
import { authSchema } from '@src/helpers/validate'

const router = Router()

router.post(
  '/login',
  validator(authSchema.LOGIN, 'body'),
  catchErrorsAsync(async (req, res) => {
    const { email, password } = req.body
    if (email && password) {
      const result = await AccountService.authenticate(email, password)
      res.cookie('access_token', result.token, {
        // secure: true,
        httpOnly: true,
        maxAge: 30 * 24 * 3600000 // milliseconds
      })
      res.json(result)
    } else {
      throw new Error('Authentication failed! Please check the request')
    }
  })
)

router.post(
  '/register',
  catchErrorsAsync(async (req, res) => {
    const { error } = validateAccount(req.body)
    console.log(error, req.body)
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].context.label })
    const data = await AccountService.create(req.body)

    res.json({ success: true, message: 'OK', data })
  })
)

router.post(
  '/change_password',
  catchErrorsAsync(async (req, res) => {
    const { email, password, new_password } = req.body
    const data = await AccountService.changePassword(email, password, new_password)

    res.json(data)
  })
)

router.post(
  '/forget_password',
  catchErrorsAsync(async (req, res) => {
    let { email, link_cms } = req.body
    if (!link_cms)
      link_cms = req.protocol + '://' + req.get('host') + req.baseUrl + '/reset_password/'
    const data = await AccountService.forgetPassword(email, link_cms)

    res.json(data)
  })
)

router.post(
  '/reset_password/:token',
  catchErrorsAsync(async (req, res) => {
    const { new_password } = req.body
    const data = await AccountService.resetPassword(req.params.token, new_password)

    res.json(data)
  })
)

router.post(
  '/logout',
  catchErrorsAsync(async (req, res) => {
    let key = KEY_SESSION
    if (req.decoded) key = key + req.decoded.userId.toString()
    else key = key + req.body.userId
    await RedisService.del(key)

    res.clearCookie('access_token')

    res.json({ success: true, message: 'LOGOUT' })
  })
)

export default router
