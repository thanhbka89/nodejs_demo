import express from 'express'
import { checkTokenJWT } from '../middlewares'

import authen from './authen'
import dev from './dev'
import user from './user'

const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'API V1' }))

router.use(`/dev`, dev)
router.use(`/authen`, authen)
router.use('/', checkTokenJWT) // routes middleware check JWT from here
router.use(`/user`, user)

export default router