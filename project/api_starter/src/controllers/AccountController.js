import * as AccountService from '@src/services/account.service'

module.exports = {
  create: async (req, res) => {
    const item = {
      ...req.body,
    }
    const data = await AccountService.create(item)

    res.json({ success: true, data })
  },

  update: async (req, res) => {
    const item = {
      ...req.body,
    }
    const data = await AccountService.update(req.params.id, item)

    res.json({ success: true, data })
  },

  get: async (req, res) => {
    const data = await AccountService.getById(req.params.id)

    res.json({ success: true, data })
  },

  delete: async (req, res) => {
    await AccountService._delete(req.params.id)

    res.json({ success: true })
  },

  deleteSoft: async (req, res) => {
    await AccountService._deleteSoft(req.params.id)

    res.json({ success: true })
  },

  list: async (req, res) => {
    const data = await AccountService.getAll()

    res.json({ success: true, data })
  },

  paginate: async (req, res) => {
    const filter = {}
    const {
      search = '',
      select = '',
      page = 1,
      limit = 5,
      searchBy = 'fullname',
      order = 'desc',
      orderBy = 'createdAt',
    } = req.query

    if (search) filter[searchBy] = { $regex: `${search}`, $options: 'i' }

    const data = await AccountService.paginate(filter, {
      select,
      page,
      limit,
      sort: { [orderBy]: order },
    })

    res.json({ success: true, data })
  },

  getProduct: async (req, res) => {
    const data = await AccountService.getProductBy(req.decoded.userId, req.query)

    res.json({ success: true, data: data.products })
  },
}
