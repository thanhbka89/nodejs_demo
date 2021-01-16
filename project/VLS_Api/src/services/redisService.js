import redis from 'redis'
import CONFIG from '../config'

let redisClient = null

export const setupRedis = async () => {
  redisClient = redis.createClient({
    host: process.env.REDIS_HOST || CONFIG.redis.host,
    port: process.env.REDIS_PORT || CONFIG.redis.port,
    // password: process.env.REDIS_PASSWORD || CONFIG.redis.password,
    db: CONFIG.redis.database,
    prefix: CONFIG.redis.prefix,
    retry_strategy: () => 100,
  })

  redisClient.on('connect', () => {
    console.log('[Redis] Connected')
  })

  redisClient.on('error', (err) => {
    console.log('[Redis] Something went wrong ' + err)
  })
}

export const get = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, reply) => {
      if (err) reject(err)
      resolve(reply)
    })
  })
}

export const set = (key, value) => {
  return new Promise((resolve, reject) => {
    redisClient.set(key, value, (err, reply) => {
      if (err) reject(err)
      resolve(reply)
    })
  })
}

export const hmset = (key, obj = {}) => {
  return new Promise((resolve, reject) => {
    redisClient.hmset(key, obj, (err, reply) => {
      if (err) reject(err)
      resolve(reply)
    })
  })
}

export const hgetall = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.hgetall(key, (err, reply) => {
      if (err) reject(err)
      resolve(reply)
    })
  })
}

export const hget = (key, field) => {
  return new Promise((resolve, reject) => {
    redisClient.hget(key, field, (err, reply) => {
      if (err) reject(err)
      resolve(reply)
    })
  })
}

export const hset = (key, field, value) => {
  return new Promise((resolve, reject) => {
    redisClient.hset(key, field, value, (err, reply) => {
      if (err) reject(err)
      resolve(reply)
    })
  })
}

export const expire = (key, second = 60) => {
  return new Promise((resolve, reject) => {
    redisClient.expire(key, second, (err, reply) => {
      if (err) reject(err)
      resolve(reply)
    })
  })
}

export const exists = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.exists(key, (err, reply) => {
      if (err) reject(err)
      resolve(reply)
    })
  })
}

export const del = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.del(key, (err, reply) => {
      if (err) reject(err)
      resolve(reply)
    })
  })
}

export const publish = (channel, message) => {
  return new Promise((resolve, reject) => {
    redisClient.publish(channel, message, (err, reply) => {
      if (err) reject(err)
      resolve(reply)
    })
  })
}

export const subscribe = (channel) => {
  return new Promise((resolve, reject) => {
    redisClient.subscribe(channel, (err, reply) => {
      if (err) reject(err)
      resolve(reply)
    })
  })
}
