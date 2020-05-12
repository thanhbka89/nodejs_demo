import { Router } from 'express'

import { uploadMultipleFiles } from '@src/controllers/UploadController'
import uploadMulter from '@src/models/ModelMulter'
import { catchErrorsAsync } from '@src/middlewares'

const router = Router()

router
  .route('/')
  .get((req, res) => {
    res.json({ message: 'API Upload v1.0' })
  })
  .post(uploadMulter.any(), catchErrorsAsync(uploadMultipleFiles))

export default router
