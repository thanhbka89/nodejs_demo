const express = require('express')
const redis = require('redis')

const subscriber = redis.createClient({
  host: '27.72.56.116',
  port: 6379,
})
const app = express()

const channel_broadcast = 'user-notify'
const channel_private = 'user-notify:client1'

subscriber.on('message', (channel, message) => {
  console.log(`[${channel}]Received data :` + message)
})

subscriber.subscribe([channel_broadcast, channel_private])

app.get('/', (req, res) => {
  res.send('Subscriber One')
})

app.listen(3006, () => {
  console.log('server is listening to port 3006')
})
