import {
	Router
} from 'express'
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
	user.password = bcrypt.hashSync(req.body.password, 8)
	// get username from payload jwt
	user.created_by = req.decoded.username || null

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
	const {page} = req.params
	const {limit, username, phone, status, from, to} = req.query
	User.paginate({page, limit, username, phone, status, from, to}, (err, reponse) => {
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

export default router