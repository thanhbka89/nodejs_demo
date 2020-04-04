import * as UserService from '../models/mongo/user.service'

module.exports = {
  create: async (req, res) => {
    try {
      const result = await UserService.create(req.body)
      res.json({ success: true, data: result })
    } catch (e) {
      res.json({ success: false, message: e.message, data: e })
    }
  },

  update: async (req, res) => {
    try {
      const result = await UserService.update(req.params.id, req.body)
      res.json({ success: true, data: result })
    } catch (e) {
      res.json({ success: false, message: e.message, data: e })
    }
  },

  get: async (req, res) => {
    try {
      const result = await UserService.getById(req.params.id)
      res.json({ success: true, data: result })
    } catch (e) {
      res.json({ success: false, message: e.message, data: e })
    }
  },

  delete: async (req, res) => {
    try {
      const result = await UserService._delete(req.params.id)
      res.json({ success: true, message: 'Remove successfully' })
    } catch (e) {
      res.json({ success: false, message: e.message, data: e })
    }
  },

  search: async (req, res) => {
      res.json('Search')
  },

  list: async (req, res) => {
    try {
      const result = await UserService.getAll()
      res.json({ success: true, data: result })
    } catch (e) {
      res.json({ success: false, message: e.message, data: e })
    }
  },
}
