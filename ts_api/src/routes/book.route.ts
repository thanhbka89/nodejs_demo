import { Router } from 'express'

import * as BookController from '../controllers/book.controller'
import { catchErrorsAsync } from '../middleware'

const router = Router()

router
  .route('/')
  .get(BookController.allBooks)
  .post(BookController.addBook)

router
  .route('/:id')
  .get(catchErrorsAsync(BookController.getBook))
  .put(BookController.updateBook)
  .delete(BookController.deleteBook)

export default router
