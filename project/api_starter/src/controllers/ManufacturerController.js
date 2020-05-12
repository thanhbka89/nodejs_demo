import * as ManufacturerService from '@src/services/manufacturer.service'

module.exports = {
  create: async (req, res) => {
    const item = {
      ...req.body,
      // created_by: req.decoded.userId,
      // updated_by: req.decoded.userId,
    }
    const data = await ManufacturerService.create(item)

    res.json({ success: true, data })
  },

  update: async (req, res) => {
    const item = {
      ...req.body,
      // updated_by: req.decoded.userId,
    }
    const data = await ManufacturerService.update(req.params.id, item)

    res.json({ success: true, data })
  },

  get: async (req, res) => {
    const data = await ManufacturerService.getById(req.params.id)
    res.json({ success: true, data })
  },

  delete: async (req, res) => {
    const { hard_delete = false } = req.query

    if (hard_delete) await ManufacturerService._delete(req.params.id)
    else await ManufacturerService._deleteSoft(req.params.id)

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

    const data = await ManufacturerService.paginate(
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

  getProduct: async (req, res) => {
    const data = await ManufacturerService.getProducs(req.params.nsxId, req.query)

    res.json({ success: true, data: data.products })
  },
}
