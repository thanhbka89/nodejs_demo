import { Router } from 'express'
import * as UserService from '../models/mongo/user.service'
const router = Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    const result = await UserService.authenticate(username, password)
    res.json(result)
  } else {
    res.json({ success: false,  message: 'Authentication failed! Please check the request' })
  }
})

export default router
