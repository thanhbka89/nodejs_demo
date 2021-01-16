// import * as PaymentLogService from '@src/services/paymentLog.old.service'
// import { validatePaymentLogFind } from '@src/helpers/validate'

// module.exports = {
//   create: async (req, res) => {
//     const item = { ...req.body } // clone obj
//     const data = await PaymentLogService.create(item)
//     // update point to user
//     PaymentLogService.addPointToUser(data.account, data.point)

//     res.json({ success: true, data })
//   },

//   update: async (req, res) => {
//     const item = { ...req.body } // clone obj
//     const data = await PaymentLogService.update(req.params.id, item)

//     res.json({ success: true, data })
//   },

//   get: async (req, res) => {
//     const data = await PaymentLogService.getById(req.params.id)
//     res.json({ success: true, data })
//   },

//   delete: async (req, res) => {
//     const { hard_delete = false } = req.query

//     if (hard_delete) await PaymentLogService._delete(req.params.id)
//     else await PaymentLogService._deleteSoft(req.params.id)

//     res.json({ success: true })
//   },

//   paginate: async (req, res) => {
//     // let queryObj = { ...req.query }
//     // const excludedFields = [
//     // 	'page',
//     // 	'limit',
//     // 	'sort',
//     // 	'select',
//     // 	'fields',
//     // 	'searchBy',
//     // 	'order',
//     // 	'orderBy',
//     // 	'search',
//     // ]
//     // excludedFields.forEach((el) => delete queryObj[el])

//     // let filter = {}
//     // let populate = [
//     // 	// { path: 'created_by', select: 'email fullname' },
//     // ]
//     // const {
//     // 	search = '', // key search
//     // 	searchBy = 'transaction', // field to search
//     // 	select = '', // list select column, ex: 'name address'
//     // 	page = 1,
//     // 	limit = 20,
//     // 	sort = 'createdAt', // multi fields, ex 'point -createdAt' => sort by "point" ascending and "createdAt" descending
//     // } = req.query

//     // if (search) filter[searchBy] = search
//     // filter.is_deleted = false

//     // let queryString = JSON.stringify(queryObj) // convert obj to string
//     // // replace gte, gt, lte, lt => $gte, $gt, $lte, $lt
//     // queryString = queryString.replace(
//     // 	/\b(gte|gt|lt|lte)\b/g,
//     // 	(match) => `$${match}`
//     // )
//     // queryObj = JSON.parse(queryString) // convert string to obj
//     // filter = { ...filter, ...queryObj } // shalow copy

//     const {
//       filter, // date format: '2020/05/12' or '2020-05-12'
//       select,
//       populate,
//       sort,
//       paginate: { page, limit },
//     } = req.mquery
//     console.log(req.mquery)

//     // const { error } = validatePaymentLogFind(filter)
//     // console.log('bbb', error, req.mquery)
//     // if (error) {
//     //   const message = error.details.map((i) => i.message).join(',')
//     //   throw new Error(message)
//     // }

//     if (filter && !filter.is_deleted) filter.is_deleted = false

//     const data = await PaymentLogService.paginate(filter, {
//       select,
//       populate,
//       sort,
//       lean: true,
//       page,
//       limit,
//     })

//     res.json({ success: true, data })
//   },
// }

import Controller from '@src/controllers/BaseController'
import Service from '@src/services/paymentLog.service'
import Model from '@src/models/payment_log.model'

const objService = new Service(Model)

class PaymentLogController extends Controller {
  constructor(service) {
    super(service)
  }

  // @override
  async create(req, res) {
    const item = { ...req.body } // clone obj
    const data = await this.service.create(item)
    // update point to user
    this.service.addPointToUser(data.account, data.point)

    res.json({ success: true, data })
  }
}

export default new PaymentLogController(objService)
