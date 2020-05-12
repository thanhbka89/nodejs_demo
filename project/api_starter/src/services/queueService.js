// import amqp_calbback from 'amqplib/callback_api'
import amqp from 'amqplib'

import CONFIG from '@src/config'
import * as LoginService from '@src/models/mongo/login.service'
import * as UserService from '@src/models/mongo/user.service'
import * as AccountService from '@src/services/account.service'
import * as RedisService from '@src/services/redisService'
import { KEY_SESSION } from '@src/constants/redis'

const CONN_URL = process.env.QUEUE_URL || CONFIG.queue_url
const REPLY_QUEUE = 'vl.feedback' // use receive message afer worker handle done

let ch = null
let amqpCon = null

// amqp_calbback.connect(CONN_URL, (err, conn) => {
//   if (err) console.error('[AMQP] err0', err.message)

//   conn.on('error', (err) => {
//     console.error('[AMQP] err1', err.message)
//   })
//   conn.on('close', () => {
//     console.error('[AMQP] err2')
//   })
//   console.log('[AMQP] connected')

//   amqpCon = conn

//   conn.createChannel((err, channel) => {
//     ch = channel
//     // Consumer
//     // ch.consume(
//     //   'users',
//     //   (msg) => {
//     //     console.log('Received Messsage: ', msg.content.toString())
//     //     ch.ack(msg)
//     //   },
//     //   { noAck: false }
//     // )

//     // comsumer('users')
//   })
// })

/** Publisher
 * @queueName(String)
 * @data(Object|String)
 * */
export const publishToQueue = async (queueName, data) => {
  const correlationId = generateUuid()
  ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data), 'utf-8'), {
    persistent: true,
    correlationId,
    replyTo: REPLY_QUEUE,
  })
}

export const publishToChannel = ({ routingKey, exchangeName, data }) => {
  return new Promise(async (resolve, reject) => {
    let channel = await amqpCon.createConfirmChannel()
    const correlationId = generateUuid()
    channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(data), 'utf-8'),
      { persistent: true, correlationId, replyTo: REPLY_QUEUE },
      (err, ok) => {
        if (err) return reject(err)

        resolve()
      }
    )
  })
}

/** Workers */
const comsumer = async (queueName, wrokerNumber = 1) => {
  await ch.prefetch(1) // maximum number of messages sent over the channel
  ch.consume(
    queueName,
    async (msg) => {
      let msgBody = msg.content.toString()
      // let data = JSON.parse(msgBody) // convert String to Object
      msgBody = await processMessage(msgBody)

      if (queueName == 'processing.requests')
        await publishToChannel({
          exchangeName: 'processing',
          routingKey: 'result',
          data: { msgBody },
        })

      console.log(
        `[${queueName}_${wrokerNumber}] Received: `,
        msgBody,
        Math.random()
      )

      let tStart = Date.now()
      // handle data here
      let tEnd = Date.now()
      const dataFeedback = JSON.stringify({
        result: 'Done or Fail',
        time: tEnd - tStart,
      })
      ch.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(dataFeedback, 'utf-8'),
        {
          correlationId: msg.properties.correlationId,
          messageId: `${queueName}_${wrokerNumber}`,
        }
      )

      await ch.ack(msg) // acknowledge message as received
    },
    { noAck: false } // true: queue will delete the message the moment it is read from the queue
    // false: the consumer might crash while doing some operation, the message to go back to the queue, so that the message can be consumed by another worker
  )

  return 'Done Queue'
}

const processMessage = (requestData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(requestData + ' - processed')
    }, 30000)
  })
}

const generateUuid = () => {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  )
}

process.on('exit', (code) => {
  ch.close()
  console.log(`Closing rabbitmq channel`)
})

export async function setupQueue() {
  // connect to RabbitMQ Instance
  let conn = await amqp.connect(CONN_URL)
  amqpCon = conn

  // create a channel
  ch = await conn.createChannel()

  // create exchange
  await ch.assertExchange('processing', 'direct', { durable: true })

  // create queues
  await ch.assertQueue('processing.requests', { durable: true })
  await ch.assertQueue('processing.results', { durable: true })
  await ch.assertQueue(REPLY_QUEUE, { durable: true })

  // bind queues
  await ch.bindQueue('processing.requests', 'processing', 'request')
  await ch.bindQueue('processing.results', 'processing', 'result')

  comsumer('users')
  comsumer('processing.requests')
  comsumer('processing.results')

  // run multi worker
  for (let index = 0; index < 5; index++) {
    comsumer('jobs', index)
    _comsumerLogin(index)
    _comsumerUserUpdate(index)
  }

  console.log(`[RabbitMQ] Setup DONE`)
  // process.exit()
}

/** ===========  Consumer ============= */
const _comsumerLogin = async (wrokerNumber = 1) => {
  const queueName = 'user.login'
  await ch.prefetch(1) // maximum number of messages sent over the channel
  ch.consume(
    queueName,
    async (msg) => {
      let msgBody = msg.content.toString()
      let data = JSON.parse(msgBody) // convert String to Object
      let result = true

      console.log(`[${queueName}_${wrokerNumber}] Received: `, msgBody)

      try {
        await LoginService.create(data)
      } catch (err) {
        result = false
      }

      const dataFeedback = JSON.stringify({
        result,
        body: msgBody,
      })
      ch.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(dataFeedback, 'utf-8'),
        {
          correlationId: msg.properties.correlationId,
          messageId: `${queueName}_${wrokerNumber}`,
        }
      )

      await ch.ack(msg) // acknowledge message as received
    },
    { noAck: false }
  )

  return 'Done Queue'
}

const _comsumerUserUpdate = async (wrokerNumber = 1) => {
  const queueName = 'user.update'
  await ch.prefetch(1) // maximum number of messages sent over the channel
  ch.consume(
    queueName,
    async (msg) => {
      let result = true
      let msgBody = msg.content.toString()
      try {
        let data = JSON.parse(msgBody) // convert String to Object

        console.log(`[${queueName}_${wrokerNumber}] Received: `, msgBody)

        try {
          // await UserService.findByIdAndUpdate(data.id, { accessToken: data.accessToken })
          AccountService.findByIdAndUpdate(data.id, {
            accessToken: data.accessToken,
          })
          RedisService.set(`${KEY_SESSION + data.id}`, data.accessToken) // store session in Redis
        } catch (err) {
          result = false
        }
      } catch (e) {
        result = false
      }

      const dataFeedback = JSON.stringify({
        result,
        body: msgBody,
      })
      ch.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(dataFeedback, 'utf-8'),
        {
          correlationId: msg.properties.correlationId,
          messageId: `${queueName}_${wrokerNumber}`,
        }
      )

      await ch.ack(msg) // acknowledge message as received
    },
    { noAck: false }
  )

  return 'Done Queue'
}
