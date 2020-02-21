import logger from 'morgan'
import express from 'express'
import cors from 'cors'
const Nexmo = require('nexmo')

const { sendResponse } = require('./helpers')
const { fetchAuthorProfile } = require('./sites/scotch')
import cronjob from './job'

import * as UserService from './models/mongo/user.service'
import Post from './models/mongo/post.model'
import { DBMongo } from './models/mongo'

cronjob()

// Check connect to MongoDB, if not set the comand connect then not save to db
new DBMongo()

const app = express()

const port = process.env.PORT || 3000
app.set('port', port)

// Load middlewares
app.use(cors())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true })) // Parse request body as JSON
app.use(express.json())

app.get('/', (req, res, next) => {
  res.json({ msg: 'Crawler!!!' })
})

// test mongo
app.post('/post', async (req, res) => {
  try {
    let post = new Post(req.body)
    const result = await post.save()
    res.json({
      data: result
    })
  } catch (error) {
    res.json({ msg: error })
  }
})
app.post('/post-user', async (req, res) => {
  try {
    const result = await UserService.create(req.body)

    res.json({ success: true, data: result })
  } catch (e) {
    res.json({ success: false, message: e.message, error: e })
  }
})
app.get('/find-user', async (req, res) => {
  UserService.filterByName(req.query)
    .then(data => {
      res.json({ data })
    })
    .catch(e => {
      res.status(500).json({
        message: e.message || 'Some error occurred while retrieving tutorials',
        error: e
      })
    })
})

// send SMS free
const nexmo = new Nexmo({
  apiKey: 'ac2626ae',
  apiSecret: 'MbebDNRT5wnsi9dR'
})
app.post('/sendsms', (req, res) => {
  const { fromPhone, toPhone, content } = req.body
  nexmo.message.sendSms(fromPhone, toPhone, content, {  type: 'unicode' },
    (err, responseData) => {
      if (err) {
        res.status(500).json({err})
      } else {
        if (responseData.messages[0]['status'] === '0') {
          res.json({msg: 'Message sent successfully'})
        } else {
          console.log(responseData)
          res.status(500).json({
            msg: `Message failed: ${responseData.messages[0]['error-text']}`
          })
        }
      }
    }
  )
})

// ex: `http://localhost:3000/scotch/reverentgeek`
app.get('/scotch/:author', (req, res, next) => {
  const author = req.params.author
  sendResponse(res)(fetchAuthorProfile(author))
})

// Start the server and listen on the preconfigured port
app.listen(port, () => console.log(`App started on port ${port}`))
