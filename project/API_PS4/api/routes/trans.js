import { Router } from 'express'
import Transaction from '../models/Transaction'
import TransactionDetail from '../models/TransactionDetail'
const router = Router()

router.get('/', async (req, res) => {
    try {
      const result = await Transaction.getAll()
      return res.json({
        success: true,
        data: result
      })
    } catch (e) {
      return res.json({
        success: false,
        data: e
      })
    }
})

router.post('/', async (req, res) => {
    try {
      let result = await Transaction.create(new Transaction(req.body))
      const {items} = req.body // get items in order
      if (items && items.length) {
        // items.forEach(function(item) {
        for (let index = 0; index < items.length; index += 1) {
          let data = {
            id_trans: result.insertId,
            id_item: items[index].name.id,
            quantity: items[index].quantity
          }
          try {
            await TransactionDetail.create(new TransactionDetail(data))
          } catch (e) {
            console.error(e)
          }
        }        
      }
      return res.json({
        success: true,
        data: 'Insert success'
      })
    } catch (e) {
      return res.json({
        success: false,
        data: e
      })
    }
})

router.route('/:id')
.get( async (req, res) => {
    try {
      const result = await Transaction.getById(req.params.id)
      return res.json({
        success: true,
        data: result
      })
    } catch (e) {
      return res.json({
        success: false,
        data: e
      })
    }
})
.put(async (req, res) => {
    try {
      const result = await Transaction.update(req.params.id, new Transaction(req.body))
      return res.json({
        success: true,
        data: result
      })
    } catch (e) {
      return res.json({
        success: false,
        data: e
      })
    }
})
.delete(async (req, res) => {
    try {
      const result = await Transaction.remove(req.params.id)
      return res.json({
        success: true,
        data: result
      })
    } catch (e) {
      return res.json({
        success: false,
        data: e
      })
    }
})

router.get('/p/:page', async (req, res) => {
  try {
    const result = await Transaction.paginate({page: req.params.page, limit: req.query.limit, ps: req.query.ps, user: req.query.user})
    return res.json({
      success: true,
      data: result
    })
  } catch (e) {
    return res.json({
      success: false,
      data: e
    })
  }
})

router.get('/detail/:id', async(req, res) => {
  try {
    const result = await Transaction.getDetailById(req.params.id)
    return res.json({
      success: true,
      data: result
    })
  } catch (e) {
    return res.json({
      success: false,
      data: e
    })
  }
})

router.get('/filter_ps/:id', async(req, res) => {
  try {
    const result = await Transaction.getByPs(req.params.id)
    return res.json({
      success: true,
      data: result
    })
  } catch (e) {
    return res.json({
      success: false,
      data: e
    })
  }
})

export default router