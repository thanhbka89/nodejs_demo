import jwt from 'jsonwebtoken'
import CONFIG from '../../config'
import db from './index'
const User = db.users

export const getAll = async () => {
  return await User.find()
}

export const filterByName = async (query = {}) => {
  const { username } = query
  let condition = username
    ? { username: { $regex: new RegExp(username), $options: 'i' } }
    : {}

  return await User.find(condition)
}

export const filter = async (query = {}) => {
  return await User.find(query)
}

/** Finds a single document by its _id field
 * @ (String|Object) projection : get fields select
 * @ (Object) options: Query.prototype.setOptions()
 */
export const getById = async (id, projection, options = {}) => {
  return await User.findById(id)
}

export const findOne = async (query = {}) => {
  return await User.findOne(query)
}

export const create = async (data = {}) => {
  // const user = new User(data)

  // return await user.save()

  return User.create(data) // not validate on save
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
  return await User.findByIdAndRemove(id)
}

export const findByIdAndUpdate = async (id, data = {}, options = {}) => {
  return await User.findByIdAndUpdate(id, data, options)
}

export const authenticate = async (username, password) => {
  const response = {
    success: false,
    message: 'Incorrect username or password',
    data: null,
  }
  try {
    const user = await findOne({ username })
    if (user) {
      const match = user.comparePassword(password)
      if (match) {
        const token = jwt.sign({ userId: user._id, username, role: user.role }, CONFIG.secret, {
          expiresIn: '24h', // expires in 24 hours
        })
        await findByIdAndUpdate(user._id, { accessToken: token })

        response.success = true
        response.token = token
        delete response.message
      }
    }
  } catch (e) {
    response.message = e.message
    response.data = e
  }

  return response
}
