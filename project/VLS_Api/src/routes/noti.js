import { Router } from 'express'

import NotificationController from '@src/controllers/NotificationController'
import { catchErrorsAsync } from '@src/middlewares'

const router = Router()

/** OrderHeader */
router
  .route('/')
  .get((req, res) => {
    res.json({ message: 'API Notification v1.0' })
  })
  .post(catchErrorsAsync(NotificationController.create))

router
  .route('/action/:id')
  .get(catchErrorsAsync(NotificationController.get))
  .put(catchErrorsAsync(NotificationController.update))
  .delete(catchErrorsAsync(NotificationController.delete))

router.get('/find', catchErrorsAsync(NotificationController.paginate))

export default router
