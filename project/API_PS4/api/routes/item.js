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
    .get((req, res) => {
        Item.getById(req.params.id, (err, response) => {
            if (err)  res.send(err);
            res.json(response);
        })
    })
    .put((req, res) => {
        Item.update(req.params.id, new Item(req.body), (err, response) => {
            if (err)  res.send(err)
            res.json(response);
        })
    })
    .delete((req, res) => {
        Item.remove(req.params.id, (err, response) => {
            if (err)  res.send(err)
            res.json(response);
        })
    })

router.get('/p/:page', (req, res) => {
    const {page} = req.params.page
    Item.paginate({page}, (err, reponse) => {
        if (err) throw err;
        res.json(reponse);
    })
})

export default router