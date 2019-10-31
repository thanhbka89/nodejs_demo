import { Router } from 'express'
import Setting from '../models/Setting'
const router = Router()

router.get('/', async (req, res) => {
    try {
      const result = await Setting.getAll()
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
      let result = await Setting.create(new Setting(req.body))
      
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
      const result = await Setting.getById(req.params.id)
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
      const result = await Setting.update(req.params.id, new Setting(req.body))
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
      const result = await Setting.remove(req.params.id)
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
    const result = await Setting.paginate(req.query)
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

router.get('/get/by_name', async (req, res) => {
  try {
    const result = await Setting.getByName(req.query.name)
    return res.json({
			success: true,
			data: result[0]
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
    const result = await Setting.count(req.query)
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