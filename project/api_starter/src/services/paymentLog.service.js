import PaymentLog from '@src/models/payment_log.model'
import {
  findByIdAndUpdate as AccountUpdate,
  getById as AccountFindId,
} from '@src/services/account.service'

export const find = async (filter = {}, projection = {}, options = {}) => {
  return PaymentLog.find(filter, projection, options)
}

export const paginate = async (query = {}, options = {}) => {
  return PaymentLog.paginate(query, options)
}

export const getById = async (id, projection = {}, options = {}) => {
  return PaymentLog.findById(id, projection, options)
}

export const findOne = async (query = {}, projection = {}, options = {}) => {
  return PaymentLog.findOne(query, projection, options)
}

export const create = async (data = {}) => {
  return PaymentLog.create(data)
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
  return PaymentLog.findByIdAndUpdate(id, data, options)
}

export const _delete = async (id) => {
  return PaymentLog.findByIdAndRemove(id)
}

export const _deleteSoft = async (id) => {
  return findByIdAndUpdate(id, { is_deleted: true })
}

export const addPointToUser = async (userId, point) => {
  // const user = await AccountFindId(userId)
  // if (!user && point) return false
  // point = user.point + point

  // return AccountUpdate(userId, { point })

  return AccountUpdate(userId, { $inc: { point } })
}
