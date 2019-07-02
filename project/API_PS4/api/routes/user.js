import {
	Router
} from 'express'
const router = Router()

const db = require('../models/dbconnection')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
import CONFIG from '../../config/config'
import User from '../models/User'

router.get('/all', (req, res) => {
	User.getAll((err, response) => {
		return res.json({
			success: true,
			data: response
		})
	})
})

router.get('/', (req, res) => {
	return res.send(Object.values(req.context.models.users));
});

router.get('/get/:userId', (req, res) => {
	console.log(req.params)
	return res.send(req.context.models.users[req.params.userId])
});

router.post('/login', (req, res) => {
	let username = req.body.username
	let password = req.body.password;
	let sql = 'SELECT * FROM users WHERE username = ?'
	if (username && password) {
		db.query(sql, [username], function (error, results, fields) {

			if (results.length) {
				let user = results[0]
				const match = bcrypt.compareSync(password, user.passwd)

				if (match) {
					let token = jwt.sign({
						username: username
					}, CONFIG.secret, {
						expiresIn: "24h" // expires in 24 hours
					});
					// return the JWT token for the future API calls
					return res.json({
						success: true,
						data: "Authentication successful!",
						user: user,
						token: token
					})
				}
			}
			res.json({
				success: false,
				data: "Incorrect username or password"
			})

		});
	} else {
		res.json({
			success: false,
			data: "Authentication failed! Please check the request"
		})
	}
});

router.post('/register', (req, res) => {
	let today = new Date()
	let user = {
		'username': req.body.username,
		'fullname': req.body.fullname,
		'nickname': req.body.nickname,
		'password': bcrypt.hashSync(req.body.password, 8),
		'phone': req.body.phone,
		'address': req.body.address
	}

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
});

export default router