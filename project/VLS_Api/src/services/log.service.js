import Model from '@src/models/log.model'

export const find = async (filter = {}, projection = {}, options = {}) => {
  return Model.find(filter, projection, options)
}

export const paginate = async (query = {}, options = {}) => {
  return Model.paginate(query, options)
}

export const getById = async (id, projection = {}, options = {}) => {
  return Model.findById(id, projection, options)
}


export const create = async (data = {}) => {
  return Model.create(data)
}

export const _delete = async (id) => {
  return Account.findByIdAndRemove(id)
}