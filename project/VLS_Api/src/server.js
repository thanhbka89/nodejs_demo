import 'dotenv/config'
import logger from 'morgan'
import express from 'express'
import cors from 'cors'
import mquery from 'express-mquery'
import compression from 'compression'
// import listEndpoints from 'express-list-endpoints'

import { init, notFound, logErrors, apiLimiter, requestLog } from '@src/middlewares'
import router from '@src/routes'
import CONFIG from '@src/config'

const app = express()
const port = process.env.PORT || CONFIG.port
app.set('port', port)

init() // setup job, db, queue, redis, ...

// Load middlewares
app.use(cors({
  credentials: true,
  origin: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-access-token', 'authorization']
}))
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true })) // parse urlencoded request body
app.use(express.json()) // parse json request body
app.use(mquery({ limit: 10, maxLimit: 50 })) // expose Mongoose query
app.use(compression()) // compress all responses

// Middleware Application
app.use(requestLog); // write logs
app.use((req, res, next) => {
  console.log(`App Middleware: ${new Date()}`)
  res.removeHeader('X-Powered-By') // remove X-Powered-By in response

  next()
})

// Routes home
app.get('/', (req, res, next) => {
  res.json({ message: 'API Home' })
})

const baseURL = '/api/v1/'
app.use(`${baseURL}`, apiLimiter) // only apply to requests that begin with
app.use(`${baseURL}`, router)
// console.log(listEndpoints(app))

// Error-handling middleware
app.use(notFound)
app.use(logErrors)

// Start the server and listen on the preconfigured port
app.listen(port, () => console.log(`[API] App started on port ${port}`))

module.exports = app // for testing mocha & chai-http