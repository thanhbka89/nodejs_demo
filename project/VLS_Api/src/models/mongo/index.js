import mongoose from 'mongoose'
import CONFIG from '../../config'
import UserModel from './user.model'
import node_acl from 'acl'
import * as RedisService from '@src/services/redisService'

const MONGO_URL = process.env.MONGO || CONFIG.mongo

export let acl = null

export default {
  mongoose,
  url: CONFIG.mongo,
  users: UserModel(mongoose),
}

export class DBMongo {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose
      .connect(MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        // autoIndex: false, // on product
      })
      .then(() => {
        console.log(`[MongoDB] Connect successfully: ${MONGO_URL}`)
        acl = new node_acl(
          new node_acl.mongodbBackend(mongoose.connection.db, '_acl_')
        )
      })
      .catch((e) => {
        console.log('[MongoDB] Connection error!', e.message)
      })

    mongoose.set('debug', process.env.MONGO_DEBUG || CONFIG.mongo_debug)
    
  }
}

// create reference for .exec
const exec = mongoose.Query.prototype.exec

// create new cache function on prototype
mongoose.Query.prototype.cache = function (options = { expire: 60, lean: false, key: null }) {
  this.useCache = true
  this.expire = options.expire
  this.isPlain = options.lean // true: plain objects, not Mongoose Documents
  this.hashKey = options.key ? JSON.stringify(options.key) : this.mongooseCollection.name

  return this
}

// override exec function to first check cache for data
mongoose.Query.prototype.exec = async function () {
  console.log(`[M_CACHED.Exec] start`)
  // check use cache when use paginate : mongoose-paginate-v2
  const { zUseCache, zCacheExpire = 60, zCacheLean = false, zCacheHashKey = null, skip = 0, limit = 0 } = this.options
  if (zUseCache) {
    this.useCache = true
    this.expire = zCacheExpire
    this.isPlain = zCacheLean // true: plain objects, not Mongoose Documents
    this.hashKey = zCacheHashKey ? JSON.stringify(zCacheHashKey) : this.mongooseCollection.name
  }

  if (!this.useCache) { // dont use cache
    return await exec.apply(this, arguments)
  }

  const key = JSON.stringify({
    ...this.getQuery(),
    skip,
    limit,
    collection: this.mongooseCollection.name,
  })
  
  // get cached value from redis
  const cacheValue = await RedisService.hget(this.hashKey, key)
  console.log(`[CACHED]`, this.hashKey, key, this.op)
  // if cache value is not found, fetch data from mongodb and cache it
  if (!cacheValue) {
    const result = await exec.apply(this, arguments)
    RedisService.hset(this.hashKey, key, JSON.stringify(result))
    RedisService.expire(this.hashKey, this.expire)
    console.log('[CACHED] Return data from MongoDB')
    
    return result
  }
  
  // return found cachedValue
  const doc = JSON.parse(cacheValue)
  console.log('[CACHED] Return data from Redis')

  if (this.isPlain) return doc // plain object
  else
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc) // converts your raw JSON data into the mongoose model
}
