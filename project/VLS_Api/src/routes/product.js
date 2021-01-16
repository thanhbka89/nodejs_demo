import { Router } from 'express'

const ProductController = require('@src/controllers/ProductController')
import ProductGroupController from '@src/controllers/ProductGroupController'
import ManufacturerController from '@src/controllers/ManufacturerController'
import { catchErrorsAsync } from '@src/middlewares'

const router = Router()

router
  .route('/')
  .get((req, res) => {
    res.json({ message: 'API Product v1.0' })
  })
  .post(catchErrorsAsync(ProductController.create))

router
  .route('/action/:id')
  .get(catchErrorsAsync(ProductController.get))
  .put(catchErrorsAsync(ProductController.update))
  .delete(catchErrorsAsync(ProductController.delete))

router.get('/list', catchErrorsAsync(ProductController.list))
router.get('/find', catchErrorsAsync(ProductController.paginate))
router.get('/filter-by-user/:userId', catchErrorsAsync(ProductController.getProductByUserCreated))
router.get('/filter-by-current_user', catchErrorsAsync(ProductController.getProductByCurentUser))
router.put('/clone/:id', catchErrorsAsync(ProductController.clone))

/** Group */
router.route('/group').post(catchErrorsAsync(ProductGroupController.create))

router
  .route('/group/action/:id')
  .get(catchErrorsAsync(ProductGroupController.get))
  .put(catchErrorsAsync(ProductGroupController.update))
  .delete(catchErrorsAsync(ProductGroupController.delete))

router.get('/group/find', catchErrorsAsync(ProductGroupController.paginate))
router.get('/group/get-product/:groupId', catchErrorsAsync(ProductGroupController.getProduct))

/** Manufacturer */
router.route('/nsx').post(catchErrorsAsync(ManufacturerController.create))
router
  .route('/nsx/action/:id')
  .get(catchErrorsAsync(ManufacturerController.get))
  .put(catchErrorsAsync(ManufacturerController.update))
  .delete(catchErrorsAsync(ManufacturerController.delete))
router.get('/nsx/find', catchErrorsAsync(ManufacturerController.paginate))
router.get('/nsx/get-product/:nsxId', catchErrorsAsync(ManufacturerController.getProduct))

export default router
