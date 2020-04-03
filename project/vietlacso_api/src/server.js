import 'dotenv/config'
import logger from 'morgan'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

import router from './routes'
import cronjob from './jobs'
import { DBMongo } from './models/mongo'
import middleware from './middlewares'

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

// Routes
app.get('/', (req, res, next) => {
  res.json({ msg: 'Crawler!!!' })
})

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many accounts created from this IP, please try again after an hour'
})
const urlApi = '/api/v1/'
app.use(urlApi, apiLimiter) // only apply to requests that begin with
app.use(`${urlApi}dev`, router.dev)
app.use(`${urlApi}authen`, router.authen)
app.use(urlApi, middleware.checkTokenJWT) // check JWT from here
app.use(`${urlApi}user`, router.user)

// Error-handling middleware
app.use((req, res) => {
  res.status(404).json({
    code: 'ERR_INVALID_404',
    url: req.originalUrl + ' not found'
  })
})

app.use((err, req, res, next) => {
  res.status(500).json({ code: 'ERR_INVALID_500' })
})

// Start the server and listen on the preconfigured port
app.listen(port, () => console.log(`App started on port ${port}`))
