class BaseController {
  constructor(service) {
    this.service = service
    this.get = this.get.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.paginate = this.paginate.bind(this)
  }

  async paginate(req, res) {
    const {
      filter = {}, // date format: '2020/05/12' or '2020-05-12'
      select,
      populate,
      sort,
      paginate: { page, limit },
    } = req.mquery

    if (!filter.is_deleted) filter.is_deleted = false

    const data = await this.service.paginate(filter, {
      select,
      populate,
      sort,
      lean: true,
      page,
      limit,
    }, { zUseCache: true, zCacheExpire: 1800, zCacheLean: true })

    res.json({ success: true, data })
  }

  async get(req, res) {
    const data = await this.service.getById(req.params.id)

    res.json({ success: true, data })
  }

  async create(req, res) {
    const item = { ...req.body } // clone obj
    const data = await this.service.create(item)

    res.json({ success: true, data })
  }

  //   async update(req, res) {
  //     const { id } = req.params
  //     let response = await this.service.update(id, req.body)

  //     return res.status(response.statusCode).send(response)
  //   }

  async update(req, res) {
    const item = { ...req.body } // clone obj
    const data = await this.service.update(req.params.id, item)

    res.json({ success: true, data })
  }

  async delete(req, res) {
    const { hard_delete = false } = req.query
    const { id } = req.params
    if (hard_delete) await this.service._delete(id)
    else await this.service._deleteSoft(id)

    res.json({ success: true })
  }
}

export default BaseController
