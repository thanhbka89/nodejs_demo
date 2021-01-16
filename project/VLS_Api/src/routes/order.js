import { Router } from 'express'

import OrderController from '@src/controllers/OrderController'
import OrderDetailController from '@src/controllers/OrderDetailController'
import { catchErrorsAsync } from '@src/middlewares'

const router = Router()

/** OrderHeader */
router
  .route('/')
  .get((req, res) => {
    res.json({ message: 'API Order v1.0' })
  })
  .post(
    catchErrorsAsync(OrderController.create)
  )

router
  .route('/create-so')
  .post(
    catchErrorsAsync(OrderController.createOrder)
  )

router
  .route('/action/:id')
  .get(catchErrorsAsync(OrderController.get))
  .put(catchErrorsAsync(OrderController.update))
  .delete(catchErrorsAsync(OrderController.delete))

router.get('/find', catchErrorsAsync(OrderController.paginate))

/** OrderDetail */
router
  .route('/detail')
  .post(
    catchErrorsAsync(OrderDetailController.create)
  )

router
  .route('/detail/action/:id')
  .get(catchErrorsAsync(OrderDetailController.get))
  .put(catchErrorsAsync(OrderDetailController.update))
  .delete(catchErrorsAsync(OrderDetailController.delete))

router.get('/detail/find', catchErrorsAsync(OrderDetailController.paginate))


export default router
