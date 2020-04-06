import { Router } from 'express'
const UserController = require('../controllers/UserController')
import { catchErrorsAsync } from '../middlewares'

const router = Router()

router
  .route('/')
  .get((req, res) => {
    res.json({ message: 'API User v1.0' })
  })
  .post(catchErrorsAsync(UserController.create))

router
  .route('/action/:id')
  .get(catchErrorsAsync(UserController.get))
  .put(catchErrorsAsync(UserController.update))
  .delete(catchErrorsAsync(UserController.delete))

router.get('/list', catchErrorsAsync(UserController.list))

router.get('/search', catchErrorsAsync(UserController.search))

export default router
