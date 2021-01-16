
import Customer from './customer.model'

export const getAll = async () => {
  return await Customer.find()
}

export const filterByName = async (query = {}) => {
  const { username } = query
  let condition = username
    ? { username: { $regex: new RegExp(username), $options: 'i' } }
    : {}

  return await Customer.find(condition)
}

export const filter = async (query = {}) => {
  return await Customer.find(query)
}

export const getById = async (id, projection = {}, options = {}) => {
  return await Customer.findById(id, projection, options)
}

export const findOne = async (query = {}) => {
  return await Customer.findOne(query)
}

/** saving one or more documents to the database
 * @data(Array|Object)
 */
export const create = async (data) => {

  return Customer.create(data) // not validate on save
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
  if (user.username !== data.username && (await findOne({ username: data.username })))
    throw new Error('Username "' + data.username + '" is already taken')

  Object.assign(user, data) // copy userParam properties to user
  
  return await user.save()
}

export const _delete = async (id) => {
  return await Customer.findByIdAndRemove(id)
}

export const findByIdAndUpdate = async (id, data = {}, options = {}) => {
  return await Customer.findByIdAndUpdate(id, data, options)
}
