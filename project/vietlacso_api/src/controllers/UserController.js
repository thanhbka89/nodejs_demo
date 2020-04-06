import * as UserService from '../models/mongo/user.service'
import { validateUser } from '../helpers/validate'

module.exports = {
  create: async (req, res) => {
    const { error } = validateUser(req.body)
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].context.label })

    const result = await UserService.create(req.body)
    res.json({ success: true, data: result })
  },

  update: async (req, res) => {
    const result = await UserService.update(req.params.id, req.body)
    res.json({ success: true, data: result })
  },

  get: async (req, res) => {
    const result = await UserService.getById(req.params.id)
    res.json({ success: true, data: result })
  },

  delete: async (req, res) => {
    const result = await UserService._delete(req.params.id)
    res.json({ success: true, message: 'Remove successfully' })
  },

  search: async (req, res) => {
    res.json('Search')
  },

  list: async (req, res) => {
    const result = await UserService.getAll()
    res.json({ success: true, data: result })
  },
}
