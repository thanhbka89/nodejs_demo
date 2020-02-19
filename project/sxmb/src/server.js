import logger from 'morgan'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const { sendResponse } = require('./helpers')
const { fetchAuthorProfile } = require('./sites/scotch')
import cronjob from './job'
import config from './config'

cronjob()

// Check connect to MongoDB
mongoose
	.connect(config.mongo, { useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => {
		console.log('MONGO connection successful')
	})
	.catch(err => {
		console.error('MONGO connection error', err.message)
	})

const app = express()

const port = process.env.PORT || 3000
app.set('port', port)

// Load middlewares
app.use(cors())
app.use(logger('dev'))

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res, next) => {
	res.json({ msg: 'Crawler!!!' })
})

// ex: `http://localhost:3000/scotch/reverentgeek`
app.get('/scotch/:author', (req, res, next) => {
	const author = req.params.author
	sendResponse(res)(fetchAuthorProfile(author))
})

// Start the server and listen on the preconfigured port
app.listen(port, () => console.log(`App started on port ${port}`))
