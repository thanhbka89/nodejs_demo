import express from 'express'
import { checkTokenJWT } from '@src/middlewares'

import authen from './authen'
import dev from './dev'
import user from './user'
import rbac from './rbac'
import upload from './upload'
import product from './product'
import account from './account'
import payment_log from './payment_log'

const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'API V1' }))

router.use(`/dev`, dev)
router.use(`/auth`, authen)
router.use('/', checkTokenJWT) // routes middleware check JWT from here
router.use(`/account`, account)
router.use(`/user`, user)
router.use(`/admin/permission`, rbac)
router.use(`/upload`, upload)
router.use(`/product`, product)
router.use(`/payment-log`, payment_log)

export default router
