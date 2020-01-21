import { Router } from 'express'
import ListPS from '../models/ListPS'
import ListPSPlaying from '../models/ListPSPlaying'
const router = Router()

router.get('/', async (req, res) => {
    try {
      const result = await ListPS.getAll()
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
      let result = await ListPS.create(new ListPS(req.body))
      
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
      const result = await ListPS.getById(req.params.id)
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
      const result = await ListPS.update(req.params.id, new ListPS(req.body))
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
      const result = await ListPS.deleteSoft(req.params.id)
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
    const result = await ListPS.paginate(req.query)
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
    const result = await ListPS.count(req.query)
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

/** API PS playing */
router.get('/playing/all', async (req, res) => {
  try {
    const result = await ListPSPlaying.getAll()
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

router.post('/playing/create', async (req, res) => {
  try {
    req.body.created_by = req.decoded.username || null
    let result = await ListPSPlaying.create(new ListPSPlaying(req.body))
    
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

router.route('/playing/action/:id')
.get( async (req, res) => {
    try {
      const result = await ListPSPlaying.getById(req.params.id)
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
      const result = await ListPSPlaying.update(req.params.id, new ListPSPlaying(req.body))
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
      const result = await ListPSPlaying.removeByPS(req.params.id)
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

router.get('/playing/p/:page', async (req, res) => {
  try {
    req.query.page = req.params.page
    const result = await ListPSPlaying.paginate(req.query)
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