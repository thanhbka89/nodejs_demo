import { Router } from 'express'
const UserController = require('../controllers/UserController')

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'API User v1.0' })
})

router.post('/post', UserController.create)

router.get('/get/:id', UserController.get)

router.put('/update/:id', UserController.update)

router.put('/remove/:id', UserController.delete)

router.get('/list', UserController.list)

router.get('/search', UserController.search)

export default router
