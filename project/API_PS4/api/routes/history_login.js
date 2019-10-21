import { Router } from 'express'
import HistoryLogin from '../models/HistoryLogin'
const router = Router()

router.get('/', async (req, res) => {
    try {
      const result = await HistoryLogin.getAll()
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
      let result = await HistoryLogin.create(new HistoryLogin(req.body))
      
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
      const result = await HistoryLogin.getById(req.params.id)
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
      const result = await HistoryLogin.update(req.params.id, new HistoryLogin(req.body))
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
      const result = await HistoryLogin.remove(req.params.id)
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
    const result = await HistoryLogin.paginate(req.query)
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
    const result = await HistoryLogin.count(req.query)
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