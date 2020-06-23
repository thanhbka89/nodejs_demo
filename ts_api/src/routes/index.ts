import express from 'express'

import * as BaseController from '../controllers/base.controller'

import book from './book.route'

const router = express.Router()

router.get('/', BaseController.index)
router.get('/health-check', (req, res) => res.json({ message: 'OK' }))

router.use(`/book`, book)

export default router
