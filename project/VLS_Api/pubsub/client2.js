const express = require('express')
const redis = require('redis')

const subscriber = redis.createClient({
  host: '27.72.56.116',
  port: 6379,
})

const app = express()

subscriber.on('message', (channel, message) => {
  console.log(`[${channel}]Received data:` + message)
})

app.get('/', (req, res) => {
  res.send('subscriber two')
})

subscriber.subscribe('user-notify')

app.listen(3007, () => {
  console.log('server is listening to port 3007')
})
