import { Router } from 'express'
import Transaction from '../models/Transaction'
import TransactionDetail from '../models/TransactionDetail'
// import Point from '../models/Point'
import Point from '../models/User'
import User from '../models/User';
const router = Router()
const TICH_DIEM = 1
const TIEU_DIEM = 2

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
      req.body.created_by = req.decoded.username || null
      let result = await Transaction.create(new Transaction(req.body))

      // Detail transaction
      const {items} = req.body // get items in order
      const numberItems = items.length
      if (items && numberItems) {
        for (let index = 0; index < numberItems; index += 1) {
          let data = {
            id_trans: result.insertId,
            id_item: items[index].name.id,
            code_item: items[index].name.code,
            quantity: items[index].quantity,
            price: items[index].name.gia_ban,
            discount: 0,
            start: items[index].start || new Date()
          }
          try {
            await TransactionDetail.create(new TransactionDetail(data))
          } catch (e) {
            console.error(e)
          }
        }        
      }

      // Tich diem
      // let point = {
      //   trans: result.insertId,
      //   user: req.body.user,
      //   point: req.body.point,
      //   type: TICH_DIEM,
      //   created_by: req.decoded.username || null
        
      // }
      // await Point.create(new Point(point))
      User.updatePoint({
        id: req.body.user,
        diem_tich: req.body.diem_tich,
        diem_tieu: req.body.diem_tieu
      }, (err, response) => {})

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
    req.query.page = req.params.page
    const result = await Transaction.paginate(req.query)
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

router.get('/get/count', async (req, res) => {
  try {
    const result = await Transaction.count(req.query)
    return res.json({
			success: true,
			data: result[0].count
		})
  } catch (e) {
    return res.json({
      success: false,
      data: e
    })
  }
})


export default router