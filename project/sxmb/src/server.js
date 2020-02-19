import logger from 'morgan'
import express from 'express'
import cors from 'cors'

const { sendResponse } = require('./helpers')
const { fetchAuthorProfile } = require('./sites/scotch')
import cronjob from './job'

import * as UserService from './models/mongo/user.service'
import Post from './models/mongo/post.model'
import dbMongo from './models/mongo'
const User = dbMongo.users

cronjob()

// Check connect to MongoDB
dbMongo.mongoose
	.connect(dbMongo.url, { useUnifiedTopology: true, useNewUrlParser: true })
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
app.post('/post-user', async(req, res) => {
	try {		
		let post = new User(req.body)
		const result = await post.save()
		res.json({
			data: result
		})
	} catch (error) {
		res.json({ msg: error })
	}
})
app.get('/find-user', async(req, res) => {
	// const {username} = req.query
 	// let condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {}

	 UserService.filter(req.query)
	 .then(data => {
	   res.json({ data })
	 })
	 .catch(err => {
	   res.status(500).json({
		 message:
		   err.message || "Some error occurred while retrieving tutorials."
	   })
	 })
})

// ex: `http://localhost:3000/scotch/reverentgeek`
app.get('/scotch/:author', (req, res, next) => {
	const author = req.params.author
	sendResponse(res)(fetchAuthorProfile(author))
})

// Start the server and listen on the preconfigured port
app.listen(port, () => console.log(`App started on port ${port}`))
