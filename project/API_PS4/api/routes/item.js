import { Router } from 'express'
import Item from '../models/Item'

const router = Router()


router.get('/', (req, res) => {
    Item.getAll((err, response) => {
        return res.json({
			success: true,
			data: response
		});
    })
})

router.post('/', (req, res) => {
    Item.create(new Item(req.body), (err, response) => {
        if (err) 
			return res.json({
				success: false,
				message: err
			});

		return res.json({
			success: true,
			message: 'Insert success!'
		});
    })

})

router.route('/:id')
    .get(async (req, res) => {
        Item.getById(req.params.id, (err, response) => {
            if (err)
                return res.json({
                    success: false,
                    message: err
                })

            return res.json(response)
        })
    })
    .put((req, res) => {
        Item.update(req.params.id, new Item(req.body), (err, response) => {
            if (err)  
                return res.json({
                    success: false,
                    message: err
                })

            return res.json({
                success: true,
                message: 'Updated successful!'
            })
        })
    })
    .delete((req, res) => {
        Item.remove(req.params.id, (err, response) => {
            if (err)
                return res.json({
                    success: false,
                    message: err
                })

            return res.json({
                success: true,
                message: 'Deleted successful!'
            })
        })
    })

router.get('/p/:page', (req, res) => {
    const {page} = req.params
    const {limit, name, code} = req.query
    Item.paginate({page, limit, name, code}, (err, reponse) => {
        if (err) throw err
        res.json(reponse)
    })
})

router.get('/cate_active/:category', (req, res) => {
    const {category} = req.params
    Item.getByCategory({category, status: 1}, (err, reponse) => {
        if (err) throw err
        res.json(reponse)
    })
})

router.get('/f/get_price_ps4', (req, res) => {
    Item.filter({code: 'PS4', status: 1}, (err, reponse) => {
        if (err) throw err
        res.json(reponse)
    })
})

export default router