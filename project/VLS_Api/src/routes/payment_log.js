import { Router } from 'express'

import PaymentLogController from '@src/controllers/PaymentLogController'
import { catchErrorsAsync, validator } from '@src/middlewares'
import { paymentLogSchema } from '@src/helpers/validate'


const router = Router()

router
  .route('/')
  .get((req, res) => {
    res.json({ message: 'API PaymentLog v1.0' })
  })
  .post(
    validator(paymentLogSchema.POST, 'body'),
    catchErrorsAsync(PaymentLogController.create)
  )

router
  .route('/action/:id')
  .get(catchErrorsAsync(PaymentLogController.get))
  .put(catchErrorsAsync(PaymentLogController.update))
  .delete(catchErrorsAsync(PaymentLogController.delete))

router.get('/find', catchErrorsAsync(PaymentLogController.paginate))

export default router
