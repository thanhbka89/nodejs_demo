const express = require('express')
const redis = require('redis')

const publisher = redis.createClient({
  host: '27.72.56.116',
  port: 6379,
})

const subscriber = redis.createClient({
  host: '27.72.56.116',
  port: 6379,
})

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
  const user = {
    id: '123456',
    name: 'Davis',
    time: new Date(),
  }
  publisher.publish('user-notify', JSON.stringify(user))

  publisher.publish(
    'user-notify:client1',
    JSON.stringify({ data: 'data for client1' })
  )

  res.json({ message: 'Publishing an Event using Redis' })
})

subscriber.subscribe('user-notify')

subscriber.on('message', function (channel, message) {
  console.log('Message Received')
  console.log(channel, message)
  io.emit(`${channel}:common`, message) // sending to all clients, include sender
  io.emit('success', { message: 'new notify' })
})

io.on('connection', (socket) => {
  console.log(socket.id + ' connected')

  setInterval(function () {
    // getApiAndEmit(socket, 'hanoi', 'vn')
    console.log('poll...')
  }, 10000)

  socket.emit('success', { message: 'Server Accecpting Connections' })

  // This will send a message letting users know the server is
  // being sutdown.
  process.on('SIGINT', () => {
    // sending to all clients, include sender
    io.emit('oops', { message: 'Server Shut Down' })
    process.exit()
  })

  // This handles the authentication and related messages.
  socket.on('authenticate', function (payload) {
    let data = JSON.parse(payload.data)

    if (data.password == 'passwd' && data.username == 'admin') {
      // This is managed in the Vue.js since it is not a feedback message.
      socket.emit('auth', { jwt: 'Generated JWT Token' })

      // We emit to two seperate message queues that are handled in store.js
      // so they are universal.
      socket.emit('success', { message: 'You are logged in' })
      socket.emit('info', {
        message: 'JWT Token Attached',
        jwt: 'GeneRAtEdJwTOken',
      })
    } else {
      // error message got picked up so changed to opps handled in store.js
      socket.emit('oops', { message: 'Invalid Credentials Supplied' })
    }
  })

  socket.on('disconnect', (reason) =>
    console.log(socket.id, 'Client disconnected', reason)
  )

  socket.on('error', (error) => {
    console.log('[socket.error]', error)
  })
})

server.listen(3005, () => {
  console.log(`server is listening on PORT 3005`)
})
