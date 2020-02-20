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

export const getById = async id => {
  return await User.findById(id)
}

export const create = async (data = {}) => {
  //   const user = new User(data)

  //   return await user.save()

  return User.create(data)
}

export async function update(id, data) {
  const user = await User.findById(id)

  // validate
  if (!user) throw 'User not found'
  if (
    user.username !== data.username &&
    (await User.findOne({ username: data.username }))
  ) {
    throw 'Username "' + data.username + '" is already taken'
  }

  // copy userParam properties to user
  Object.assign(user, data)

  return await user.save()
}

export const _delete = async id => {
  return await User.findByIdAndRemove(id)
}
