import { Router } from 'express'

import SuggestFriendController from '@src/controllers/SuggestFriendController'
import { catchErrorsAsync } from '@src/middlewares'

const router = Router()

router
  .route('/')
  .get((req, res) => {
    res.json({ message: 'API Suggest Friend v1.0' })
  })
  .post(
    catchErrorsAsync(SuggestFriendController.create)
  )

router
  .route('/action/:id')
  .get(catchErrorsAsync(SuggestFriendController.get))
  .put(catchErrorsAsync(SuggestFriendController.update))
  .delete(catchErrorsAsync(SuggestFriendController.delete))

router.get('/find', catchErrorsAsync(SuggestFriendController.paginate))

export default router
