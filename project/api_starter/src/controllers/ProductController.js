import * as ProductService from '@src/services/product.service'
import { getProductBy } from '@src/services/account.service'

module.exports = {
  create: async (req, res) => {
    const item = {
      ...req.body,
      created_by: req.decoded.userId,
      updated_by: req.decoded.userId,
    }
    const data = await ProductService.create(item)

    res.json({ success: true, data })
  },

  update: async (req, res) => {
    const item = {
      ...req.body,
      updated_by: req.decoded.userId,
    }
    const data = await ProductService.update(req.params.id, item)

    res.json({ success: true, data })
  },

  get: async (req, res) => {
    const data = await ProductService.getById(req.params.id)
    res.json({ success: true, data })
  },

  delete: async (req, res) => {
    const { hard_delete = false } = req.query

    if (hard_delete) await ProductService._delete(req.params.id)
    else await ProductService._deleteSoft(req.params.id)

    res.json({ success: true })
  },

  search: async (req, res) => {
    const { query } = req
    const match = {}
    const sort = {}
    if (query.active) match.active = query.active === 'true'

    if (query.sortBy && query.OrderBy)
      sort[query.sortBy] = query.OrderBy === 'desc' ? -1 : 1

    res.json('Search')
  },

  list: async (req, res) => {
    const data = await ProductService.getAll()
    res.json({ success: true, data })
  },

  paginate: async (req, res) => {
    const filter = {}
    const populate = [
      { path: 'created_by', select: 'email fullname'},
      { path: 'updated_by', select: 'email fullname'}
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

    const data = await ProductService.paginate(
      filter, // { [searchBy]: { $regex : `${search}`, $options: 'i' } },
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

  getProductByUserCreated: async (req, res) => {
    const data = await getProductBy(req.params.userId, req.query)

    res.json({ success: true, data: data.products })
  },

  getProductByCurentUser: async (req, res) => {
    const data = await getProductBy(req.decoded.userId, req.query)

    res.json({ success: true, data: data.products })
  },

  clone: async (req, res) => {
    const data = await ProductService.clone(req.params.id)

    res.json({ success: true, data })
  }
}
