import {
	Router
} from 'express'
import { asyncMiddleware } from '../middlewares/asyncMiddleware'
const router = Router()

// const db = require('../models/dbconnection')
// const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
// import CONFIG from '../../config/config'
import User from '../models/User'

router.get('/all', (req, res) => {
	User.getAll((err, response) => {
		return res.json({
			success: true,
			data: response
		})
	})
})

router.route('/')
	.get(async (req, res) => {
		User.getAll((err, response) => {
			return res.json({
				success: true,
				data: response
			})
		})
	})
	.post((req, res) => {
		User.create(new User(req.body), (err, response) => {
			if (err) 
				return res.json({
					success: false,
					message: err
				})
	
			return res.json({
				success: true,
				message: 'Insert success!'
			})
		})
	})

router.get('/get', (req, res) => {
	return res.send(Object.values(req.context.models.users));
})

router.get('/get/:userId', (req, res) => {
	console.log(req.params)
	return res.send(req.context.models.users[req.params.userId])
})

// router.post('/login', (req, res) => {
// 	let username = req.body.username
// 	let password = req.body.password;
// 	let sql = 'SELECT * FROM users WHERE username = ?'
// 	if (username && password) {
// 		db.query(sql, [username], function (error, results, fields) {

// 			if (results.length) {
// 				let user = results[0]
// 				const match = bcrypt.compareSync(password, user.passwd)
// 				delete user.passwd

// 				if (match) {
// 					let token = jwt.sign({
// 						username: username
// 					}, CONFIG.secret, {
// 						expiresIn: "24h" // expires in 24 hours
// 					});
// 					// return the JWT token for the future API calls
// 					return res.json({
// 						success: true,
// 						data: "Authentication successful!",
// 						user: user,
// 						token: token
// 					})
// 				}
// 			}
// 			res.json({
// 				success: false,
// 				data: "Incorrect username or password"
// 			})

// 		});
// 	} else {
// 		res.json({
// 			success: false,
// 			data: "Authentication failed! Please check the request"
// 		})
// 	}
// })

router.post('/register', (req, res) => {
	let today = new Date()
	const user = req.body
	user.password = bcrypt.hashSync(req.body.password || '123', 8)
	// get username from payload jwt
	user.created_by = req.decoded.username || null

	if (req.body.username && req.body.phone) {
		User.create(new User(user), (err, reponse) => {
			if (err) 
				return res.json({
					success: false,
					message: err
				})
	
			return res.json({
				success: true,
				message: 'Insert success!'
			})
		})
	} else {
		return res.json({
			success: false,
			message: {
				msg: 'Input data invalid',
				code: 'INPUT_INVALID' 
			}
		})
	}
})

router.route('/action/:id')
    .get(async (req, res) => {
        User.getById(req.params.id, (err, response) => {
			if (err)
				return res.json({
					success: false,
					message: 'Get failed',
					data: err
				})
            return res.json({
				success: true,
				data: response
			})
        })
    })
    .put((req, res) => {
		const user = req.body
		if (user.password) {
			user.password = bcrypt.hashSync(req.body.password, 8)
		}
        User.update(req.params.id, new User(user), (err, response) => {
			if (err)  
				return res.json({
					success: false,
					message: 'Update failed',
					data: err
				})
			return res.json({
				success: true,
				message: 'Update successfully',
				data: response
			})
        })
    })
    .delete((req, res) => {
        User.deleteSoft(req.params.id, (err, response) => {
			if (err)
				return res.json({
					success: false,
					message: 'Delete failed',
					data: err
				})
			return res.json({
				success: true,
				message: 'Delete successfully',
				data: response
			})
        })
	})

router.get('/p/:page', (req, res) => {
	req.query.page = req.params.page
	User.paginate(req.query, (err, reponse) => {
		if (err) throw err
		res.json(reponse)
	})
})

router.get('/count', async (req, res) => {
	User.count(req.query, (err, response) => {
		if (err) 
			return res.json({
				success: false,
				message: err
			})

		return res.json({
			success: true,
			data: response[0].count
		})
	})
})

// ex: http://localhost:9090/api/ps4/v1/user/findCustomer?q=098
router.get('/findCustomer', async (req, res) => {
	User.findCustomer(req.query.q, (err, response) => {
		if (err) 
			return res.json({
				success: false,
				message: err
			})

		return res.json({
			success: true,
			data: response
		})
	})
})

router.put('/updateRank', async (req, res) => {
	User.updateRank(req.body, (err, response) => {
		if (err) 
			return res.json({
				success: false,
				message: 'Fail!',
				data: err
			})

		return res.json({
			success: true,
			message: 'Update successfully',
			data: response
		})
	})
})

router.get('/testAsync', asyncMiddleware(async (req, res, next) => {
	/* 
      if there is an error thrown in getUserFromDb, asyncMiddleware
      will pass it to next() and express will handle the error;
    */
    // const user = await getUserFromDb({ id: req.params.id })
	// res.json(user)
	
	throw new Error('PES2020')
}))

export default router