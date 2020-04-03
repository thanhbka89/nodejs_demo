import { Router } from 'express'
const jwt = require('jsonwebtoken')

import CONFIG from '../config'
import * as UserService from '../models/mongo/user.service'
const router = Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    try {
      const user = await UserService.findOne({ username })
      if (user) {
        const match = user.comparePassword(password)
        if (match) {
          const token = jwt.sign({ username: username }, CONFIG.secret, {
            expiresIn: '24h' // expires in 24 hours
          })
          
          return res.json({
            success: true,
            token: token
          })
        }
      }
      res.json({ success: false, message: 'Incorrect username or password' })
    } catch (e) {
      res.json({ success: false, message: e.message, error: e })
    }
  } else {
    res.json({
      success: false,
      data: 'Authentication failed! Please check the request'
    })
  }
})

export default router
