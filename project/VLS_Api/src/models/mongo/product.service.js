
import Model from './product.model'

export const getAll = async () => {
  return await Model.find()
}


export const filter = async (query = {}) => {
  return await Model.find(query)
}

export const getById = async (id, projection = {}, options = {}) => {
  return await Model.findById(id, projection, options)
}

export const findOne = async (query = {}) => {
  return await Model.findOne(query)
}

/** saving one or more documents to the database
 * @data(Array|Object)
 */
export const create = async (data) => {

  return Model.create(data) // not validate on save
}

export async function modify(filter = {}, data) {
  const user = await findOne(filter)
  if (!user) {
    create(data)
    return { message: 'Created', _id: 1 }
  } 

  Object.assign(user, data) // copy userParam properties to user

  await user.save()
  return { message: 'Updated', _id: user._id }
}

export async function update(id, data) {
  const user = await getById(id)
  if (!user) throw new Error('User not found')

  Object.assign(user, data) // copy userParam properties to user
  
  return await user.save()
}

export const _delete = async (id) => {
  return await Model.findByIdAndRemove(id)
}

export const findByIdAndUpdate = async (id, data = {}, options = {}) => {
  return await Model.findByIdAndUpdate(id, data, options)
}
