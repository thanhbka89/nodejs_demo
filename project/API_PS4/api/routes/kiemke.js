import { Router } from 'express'
import KiemKe from '../models/KiemKe'
const router = Router()

router.get('/', async (req, res) => {
    try {
      const result = await KiemKe.getAll()
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
      let result = await KiemKe.create(new KiemKe(req.body))
      
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
      const result = await KiemKe.getById(req.params.id)
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
      const result = await KiemKe.update(req.params.id, new KiemKe(req.body))
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
      const result = await KiemKe.deleteSoft(req.params.id)
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
    const result = await KiemKe.paginate(req.query)
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
    const result = await KiemKe.count(req.query)
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

router.post('/post/mass_save', async (req, res) => {
  try {
    const created_by = req.decoded.username || null
    const {items, period} = req.body
    const len = items.length
    for (let index = 0; index < len; index += 1) {
      let data = items[index]
      data.created_by = created_by
      data.period = period
      let check = await KiemKe.paginate({
        page: 1,
        limit: 1,
        id_item: data.id_item,
        code: data.code,
        period: data.period
      })
      if (check.length) { // neu da co data trong table
        data.updated_by = req.decoded.username
        await KiemKe.update(check[0].id, new KiemKe(data))
      } else { // tao moi
        await KiemKe.create(new KiemKe(data))
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

export default router