import * as GroupService from '@src/services/productGroup.service'
import { getProductBy } from '@src/services/account.service'

module.exports = {
  create: async (req, res) => {
    const item = {
      ...req.body,
      // created_by: req.decoded.userId,
      // updated_by: req.decoded.userId,
    }
    const data = await GroupService.create(item)

    res.json({ success: true, data })
  },

  update: async (req, res) => {
    const item = {
      ...req.body,
      // updated_by: req.decoded.userId,
    }
    const data = await GroupService.update(req.params.id, item)

    res.json({ success: true, data })
  },

  get: async (req, res) => {
    const data = await GroupService.getById(req.params.id)
    res.json({ success: true, data })
  },

  delete: async (req, res) => {
    const { hard_delete = false } = req.query

    if (hard_delete) await GroupService._delete(req.params.id)
    else await GroupService._deleteSoft(req.params.id)

    res.json({ success: true })
  },

  paginate: async (req, res) => {
    const filter = {}
    const populate = [
      // { path: 'created_by', select: 'email fullname' },
    ]
    const {
      search = '',
      select = '', // name price
      page = 1,
      limit = 5,
      searchBy = 'name',
      order = 'desc',
      orderBy = 'createdAt',
      deleted = false,
    } = req.query

    if (search) filter[searchBy] = { $regex: `${search}`, $options: 'i' }
    filter.is_deleted = deleted || false

    const data = await GroupService.paginate(
      filter,
      {
        select,
        populate,
        page,
        limit,
        sort: { [orderBy]: order },
      }
    )

    res.json({ success: true, data })
  },

  getProductByGroup: async (req, res) => {
    const data = await GroupService.getProducs(req.params.groupId, req.query)

    res.json({ success: true, data: data.products })
  },
}
