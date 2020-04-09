import AclService from '../models/mongo/acl.service'
import * as UserService from '../models/mongo/user.service'

module.exports = {
  create: async (req, res) => {
    // const result = await UserService.create(req.body)
    // res.json({ success: true, data: result })
  },

  addRoles2User: async (req, res) => {
    const { userId, roles } = req.body
    if (userId != req.params.userId)
      res.json({ success: false, messgae: 'Not same data' })
    const result = await AclService.addUserRoles(userId, roles)

    res.json({ success: true, data: result })
  },

  removeRoles2User: async (req, res) => {
    const { userId, roles } = req.body
    if (userId != req.params.userId)
      res.json({ success: false, messgae: 'Not same data' })
    const result = await AclService.removeUserRoles(userId, roles)

    res.json({ success: true, data: result })
  },

  update: async (req, res) => {
    // const result = await UserService.update(req.params.id, req.body)
    // res.json({ success: true, data: result })
  },

  get: async (req, res) => {
    // const result = await UserService.getById(req.params.id)
    // res.json({ success: true, data: result })
  },

  getUserRoles: async (req, res) => {
    const user = await UserService.getById(req.params.userId)
    const roles = await AclService.userRoles(user._id.toString())

    res.json({ success: true, data: roles })
  },

  getRoleUsers: async (req, res) => {
    const users = await AclService.roleUsers(req.params.role)

    res.json({ success: true, data: users })
  },

  delete: async (req, res) => {
    // const result = await UserService._delete(req.params.id)
    // res.json({ success: true, message: 'Remove successfully' })
  },

  search: async (req, res) => {
    res.json('Search')
  },

  list: async (req, res) => {
    // const result = await UserService.getAll()
    // res.json({ success: true, data: result })
  },
}
