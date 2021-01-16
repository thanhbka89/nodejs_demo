import express from 'express'
import { checkTokenJWT } from '@src/middlewares'
import { createAbilities } from '@src/abilities'

import authen from './authen'
import dev from './dev'
import user from './user'
import rbac from './rbac'
import upload from './upload'
import product from './product'
import account from './account'
import payment_log from './payment_log'
import public_guest from './public'
import order from './order'
import noti from './noti'
import suggest_friend from './suggest_friend'

const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'API V1' }))

router.use(`/dev`, dev)
router.use(`/public`, public_guest)
router.use(`/auth`, authen)
router.use('/', checkTokenJWT) // routes middleware check JWT from here
router.use('/', createAbilities) // routes middleware check authorized
router.use(`/account`, account)
router.use(`/user`, user)
router.use(`/admin/permission`, rbac)
router.use(`/upload`, upload)
router.use(`/product`, product)
router.use(`/order`, order)
router.use(`/payment-log`, payment_log)
router.use(`/noti`, noti)
router.use(`/suggest-friend`, suggest_friend)

export default router
