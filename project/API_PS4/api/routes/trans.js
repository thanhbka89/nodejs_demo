import { Router } from 'express'
import Transaction from '../models/Transaction'
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
        const result = await Transaction.create(new Transaction(req.body))
        // console.log(result)
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
        const result = await Transaction.paginate({page: req.params.page})
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