import 'dotenv/config'
import logger from 'morgan'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import listEndpoints from 'express-list-endpoints'

import router from './routes'
import cronjob from './jobs'
import { DBMongo } from './models/mongo'
import { notFound, logErrors } from './middlewares'
import { setupQueue } from './services/queueService'
import { setupRedis } from './services/redisService'

setupRedis()
setupQueue().catch((e) =>
  console.error(`[QUEUE_ERR]: ${e.message}. Check config Url connecttion!`)
)
cronjob()
new DBMongo() // Check connect to MongoDB, if not set the comand connect then not save to db

const app = express()
const port = process.env.PORT || 3000
app.set('port', port)

// Load middlewares
app.use(cors())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true })) // Parse request body as JSON
app.use(express.json())

// Middleware Application
app.use((req, res, next) => {
  console.log('App Middleware:' + new Date())
  res.removeHeader('X-Powered-By') // remove X-Powered-By in response

  next()
})

// Routes home
app.get('/', (req, res, next) => {
  res.json({ message: 'API Home' })
})

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message:
    'Too many accounts created from this IP, please try again after an hour',
})
const baseURL = '/api/v1/'
app.use(`${baseURL}`, apiLimiter) // only apply to requests that begin with
app.use(`${baseURL}`, router)
// console.log(listEndpoints(app))

// Error-handling middleware
app.use(notFound)
app.use(logErrors)

// Start the server and listen on the preconfigured port
app.listen(port, () => console.log(`App started on port ${port}`))
