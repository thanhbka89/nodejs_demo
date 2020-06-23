import express from 'express'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'

import router from './routes'
import { notFound, logErrors } from './middleware'

// Our Express APP config
const app = express()
const uri: string =
	'mongodb://vlscms:Fbecx4KjVsSFLyck@27.72.56.116:9528/vietlacso-test'
// 'mongodb://127.0.0.1:27017/local'

mongoose.connect(
	uri,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	},
	(err: any) => {
		if (err) {
			console.log(err.message)
		} else {
			console.log('[MongoDB] Connected!')
		}
	}
)

app.set('port', process.env.PORT || 3000)
app.use(helmet())
app.use(cors())
app.use(compression())
app.use(express.urlencoded({ extended: true })) // parse urlencoded request body
app.use(express.json()) // parse json request body

// API Endpoints
app.use(`/`, router)

// Error-handling middleware
app.use(notFound)
app.use(logErrors)

// export our app
export default app
