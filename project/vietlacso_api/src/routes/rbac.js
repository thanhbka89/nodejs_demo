import { Router } from 'express'
const RbacController = require('../controllers/RbacController')
import { catchErrorsAsync } from '../middlewares'

const router = Router()

router
  .route('/user-role/:userId')
  .get(catchErrorsAsync(RbacController.getUserRoles))
  .post(catchErrorsAsync(RbacController.addRoles2User))
  .put(catchErrorsAsync(RbacController.removeRoles2User))

router.get('/role-user/:role', catchErrorsAsync(RbacController.getRoleUsers))

export default router
