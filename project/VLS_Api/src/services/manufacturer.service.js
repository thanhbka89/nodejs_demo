import BaseService from '@src/services/base.service'

class ManufacturerService extends BaseService {
  constructor(model) {
    super(model)
  }

  /** List product of Group
   * @param(required) id(String): groupId
   * @param           query.active: true|false
   * @param           query.sortBy: fieldname
   * @param           query.OrderBy: desc
   * @param           query.limit
   * @param           query.skip
   */
  async getProducs(id, query = {}) {
    const match = {}
    const sort = {}
    if (query.active) match.active = query.active === 'true'
    if (query.sortBy && query.OrderBy)
      sort[query.sortBy] = query.OrderBy === 'desc' ? -1 : 1

    const options = {
      limit: parseInt(query.limit) || 20,
      skip: parseInt(query.skip) || 0,
      sort,
    }
    const group = await this.getById(id)

    return group
      .populate({
        path: 'products',
        match,
        options,
      })
      .execPopulate()
  }
}

export default ManufacturerService
