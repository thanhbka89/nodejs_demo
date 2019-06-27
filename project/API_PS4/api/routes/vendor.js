import { Router } from 'express'
const router = Router()

let vendorsCtrl = require('../controllers/VendorsController')

router.route('/')
    .get(vendorsCtrl.get)
    .post(vendorsCtrl.store)

router.route('/:id')
    .get(vendorsCtrl.detail)
    .put(vendorsCtrl.update)
    .delete(vendorsCtrl.delete)

router.get('/p/:page', vendorsCtrl.paginate)
router.get('/s/query', vendorsCtrl.search)

export default router