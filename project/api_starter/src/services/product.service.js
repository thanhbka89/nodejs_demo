import Product from '@src/models/product.model'
import { publishToQueue } from './queueService'

export const find = async (filter = {}, projection = {}, options = {}) => {
  return Product.find(filter, projection, options)
}

export const paginate = async (query = {}, options = {}) => {
  return Product.paginate(query, options)
}

export const getAll = async () => {
  return find()
}

export const getById = async (id, projection = {}, options = {}) => {
  return Product.findById(id, projection, options)
    .populate('created_by', 'email fullname')
    .populate('updated_by', 'email fullname')
    .populate('product_group', 'name')
    .populate('manufacturer', 'name')
}

export const findOne = async (query = {}, projection = {}, options = {}) => {
  return Product.findOne(query, projection, options)
}

export const create = async (data = {}) => {
  return Product.create(data)
}

export const update = async (id, data) => {
  let item = await getById(id)
  if (!item) throw new Error(`Not found: ${id}`)

  Object.assign(item, data) // copy data properties to item

  return item.save()
}

export const modify = async (filter = {}, data) => {
  const item = await findOne(filter)
  if (!item) return create(data)

  Object.assign(item, data) // copy userParam properties to user

  return item.save()
}

export const findByIdAndUpdate = async (id, data = {}, options = {}) => {
  return Product.findByIdAndUpdate(id, data, options)
}

export const _delete = async (id) => {
  return Product.findByIdAndRemove(id)
}

export const _deleteSoft = async (id) => {
  return findByIdAndUpdate(id, { is_deleted: true })
}

export const clone = async (id) => {  
  let product = await findOne({_id: id})
  if (!product) throw new Error(`Not found: ${id}`)

  let item = {...product._doc}
  item.origin_id = item._id // sp clone sẽ update origin_id = ObjectId sp gốc
  delete item._id
  delete item.__v

  return create(item)
}
