import { Router } from 'express'

const ProductController = require('@src/controllers/ProductController')
import { catchErrorsAsync } from '@src/middlewares'
import ProductGroupController from '@src/controllers/ProductGroupController'
import ManufacturerController from '@src/controllers/ManufacturerController'

import mongoServer from '@src/models/mongo'
import * as RedisService from '@src/services/redisService'


const router = Router()

router.route('/').get((req, res) => {
  res.json({ message: 'API Public v1.0' })
})

router.route('/health-check').get(
  catchErrorsAsync(async (req, res) => {
    // mongo
    let mongo = { status: false, message: 'Mongo Server Down' }
    if (mongoServer.mongoose.connection.readyState === 1)
      mongo = { status: true, message: 'Mongo Server OK' }

    let redis = { status: false, message: 'Redis Server Down' }
    // redis
    let result = await RedisService.get('toilatoi')
    console.log('redis', result)

    let queue = { status: false, message: 'RabbitmqCloud Down' }
    // rabbitmq

    let cdn = { status: false, message: 'CDN Cloudinary Down' }
    // cdn

    let mail = { status: false, message: 'Mail not config' }
    // mail

    const data = { mongo, redis, queue, cdn, mail }

    res.json({ data })
  })
)

router.get('/product', catchErrorsAsync(ProductController.paginate))
router.route('/product/:id').get(catchErrorsAsync(ProductController.get))

router.get('/product-group', catchErrorsAsync(ProductGroupController.paginate))
router
  .route('/product-group/:id')
  .get(catchErrorsAsync(ProductGroupController.get))

router.get('/product-nsx', catchErrorsAsync(ManufacturerController.paginate))
router
  .route('/product-nsx/:id')
  .get(catchErrorsAsync(ManufacturerController.get))

export default router
