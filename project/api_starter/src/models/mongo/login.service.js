import Model from './login.model'

export const getAll = async () => {
  return await Model.find()
}

export const filter = async (query = {}) => {
  return await Model.find(query)
}

export const findOne = async (query = {}) => {
  return await Model.findOne(query)
}

/** saving one or more documents to the database
 * @data(Array|Object)
 */
export const create = async (data) => {
  return Model.create(data)
}

export const _delete = async (id) => {
  return await Model.findByIdAndRemove(id)
}
