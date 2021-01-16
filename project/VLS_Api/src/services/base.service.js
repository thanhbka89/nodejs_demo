import * as RedisService from '@src/services/redisService'

class BaseService {
    
  constructor(model) {
    this.model = model
    this.paginate = this.paginate.bind(this)
    this.find = this.find.bind(this)
    this.getById = this.getById.bind(this)
    this.findOne = this.findOne.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.modify = this.modify.bind(this)
    this.findByIdAndUpdate = this.findByIdAndUpdate.bind(this)
    this._delete = this._delete.bind(this)
    this._deleteSoft = this._deleteSoft.bind(this)
    this.hydrate = this.hydrate.bind(this)
    this.keyRedis = model.collection.collectionName
  }

  async paginate(query = {}, options = {}, cache = {}) {
    options.options = { ...options.options, ...cache }
    console.log('[PaginateV2]', options, this.model.collection.collectionName, this.keyRedis)
    
    return this.model.paginate(query, options)
  }

  async find(filter = {}, projection = {}, options = {}) {
    return this.model.find(filter, projection, options).cache({ expire: 3600, lean: true })
  }

  async getById(id, projection = {}, options = {}) {
    return this.model.findById(id, projection, options).cache({ expire: 3600 })
  }

  async findOne(query = {}, projection = {}, options = {}) {
    return this.model.findOne(query, projection, options).cache({ expire: 3600 })
  }

  async create(data) {
    RedisService.del(this.keyRedis)

    return this.model.create(data)
  }

  async update(id, data) {
    RedisService.del(this.keyRedis)
    let item = await this.getById(id)
    if (!item) throw new Error(`Not found: ${id}`)

    Object.assign(item, data) // copy data properties to item

    return item.save()
  }

  async modify(filter = {}, data) {
    RedisService.del(this.keyRedis)
    const item = await this.findOne(filter)
    if (!item) return this.create(data)

    Object.assign(item, data) // copy userParam properties to user

    return item.save()
  }

  async findByIdAndUpdate(id, data = {}, options = {}) {
    RedisService.del(this.keyRedis)

    return this.model.findByIdAndUpdate(id, data, options)
  }

  async _delete(id) {
    RedisService.del(this.keyRedis)

    return this.model.findByIdAndRemove(id)
  }

  async _deleteSoft(id) {
    return this.findByIdAndUpdate(id, { is_deleted: true })
  }

  async hydrate(raw = {}) {
    return this.model.hydrate(raw)
  }

}

export default BaseService
