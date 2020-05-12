import ProductGroup from '@src/models/product_group.model'

export const find = async (filter = {}, projection = {}, options = {}) => {
  return ProductGroup.find(filter, projection, options)
}

export const paginate = async (query = {}, options = {}) => {
  return ProductGroup.paginate(query, options)
}

export const getById = async (id, projection = {}, options = {}) => {
  return ProductGroup.findById(id, projection, options)
}

export const findOne = async (query = {}, projection = {}, options = {}) => {
  return ProductGroup.findOne(query, projection, options)
}

export const create = async (data = {}) => {
  return ProductGroup.create(data)
}

export const update = async (id, data) => {
  let item = await getById(id)
  if (!item) throw new Error(`Not found: ${id}`)

  Object.assign(item, data) // copy data properties to item

  return item.save()
}

export const modify = async (filter = {}, data) => {
  const item = await findOne(filter)
  if (!item) return create(data)

  Object.assign(item, data) // copy userParam properties to user

  return item.save()
}

export const findByIdAndUpdate = async (id, data = {}, options = {}) => {
  return ProductGroup.findByIdAndUpdate(id, data, options)
}

export const _delete = async (id) => {
  return ProductGroup.findByIdAndRemove(id)
}

export const _deleteSoft = async (id) => {
  return findByIdAndUpdate(id, { is_deleted: true })
}

/** List product of Group
 * @param(required) id(String): groupId
 * @param           query.active: true|false
 * @param           query.sortBy: fieldname
 * @param           query.OrderBy: desc
 * @param           query.limit
 * @param           query.skip
*/
export const getProducs = async (id, query = {}) => {
  const match = {}
  const sort = {}
  if (query.active) match.active = query.active === 'true'
  if (query.sortBy && query.OrderBy)
    sort[query.sortBy] = query.OrderBy === 'desc' ? -1 : 1

  const options = {
    limit: parseInt(query.limit) || 5,
    skip: parseInt(query.skip) || 0,
    sort
  }
  const group = await getById(id)

  return group
    .populate({
      path: 'products',
      match,
      options,
    })
    .execPopulate()
}