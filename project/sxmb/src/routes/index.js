import { Router } from 'express'
const router = Router()
const { getTodoList } = require('../controllers/TodoController')

router.get('/', (req, res) => {
  res.json({ message: 'API v1.0' })
})

router.get('/todos', getTodoList)

module.exports = router
