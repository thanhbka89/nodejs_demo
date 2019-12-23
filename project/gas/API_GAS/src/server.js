import 'dotenv/config'
import express, { json } from 'express'
const app = express()
import { json as _json, urlencoded } from 'body-parser'
import cors from 'cors'

const port = process.env.PORT || 3000
const node_env = process.env.NODE_ENV || 'development'

import config, { mysql } from './configs'
console.log(config, mysql)
console.log(process.env.MY_SECRET)

//routes
import routes from './routes/index'

// middleware
app.use(json())
app.use(_json())
app.use(urlencoded({ extended: false }))
app.use(cors())

app.use((req, res, next) => {
    console.log('Request Received: ', Date.now())
    next()
})

app.get('/', (req, res) => res.json({msg: 'Hello World!'}))

app.use('/api/v1', routes)

app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} Not Found`)
    err.status = 404
    next(err)
})
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({ msg: err.message })
})

app.listen(port, () => console.log(`[${new Date}] Example app listening on port ${port}!`))