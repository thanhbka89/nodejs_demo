import { Router } from 'express'

const AccountController = require('@src/controllers/AccountController')
import { catchErrorsAsync } from '@src/middlewares'

const router = Router()

router
  .route('/')
  .get((req, res) => {
    res.json({ message: 'API Account v1.0' })
  })
  .post(catchErrorsAsync(AccountController.create))

router
  .route('/action/:id')
  .get(catchErrorsAsync(AccountController.get))
  .put(catchErrorsAsync(AccountController.update))
  .delete(catchErrorsAsync(AccountController.deleteSoft))

router.get('/list', catchErrorsAsync(AccountController.list))
router.get('/find', catchErrorsAsync(AccountController.paginate))
router.get('/get-product', catchErrorsAsync(AccountController.getProduct))
router.get('/profile', catchErrorsAsync(AccountController.getProfile))
router.get('/get-role', catchErrorsAsync(AccountController.getUserRoleAbility))

export default router
