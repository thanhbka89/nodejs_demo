import { Router } from 'express'
const UserController = require('../controllers/UserController')
import { catchErrorsAsync, checkForPermissions, grantAccess, authenticateRole } from '../middlewares'

const router = Router()

router
  .route('/')
  .get(checkForPermissions, (req, res) => {
    res.json({ message: 'API User v1.0' })
  })
  .post(catchErrorsAsync(UserController.create))

router
  .route('/action/:id')
  .get(grantAccess('readOwn', 'profile'), catchErrorsAsync(UserController.get))
  .put(grantAccess('updateAny', 'profile'), catchErrorsAsync(UserController.update))
  .delete(grantAccess('deleteAny', 'profile'), catchErrorsAsync(UserController.delete))

router.get('/list', grantAccess('readAny', 'profile'), catchErrorsAsync(UserController.list))

router.get('/search', grantAccess('readAny', 'profile'), catchErrorsAsync(UserController.search))

//This is accessed by only Admin user
router.get('/only-admin', authenticateRole(['admin']), catchErrorsAsync(UserController.search))
//This is accessed by anyone
router.get('/anyone', authenticateRole(['admin','author','basic']), catchErrorsAsync(UserController.search))

export default router
