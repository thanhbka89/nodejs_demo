import {
	Router
} from 'express'
const router = Router()

const db = require('../models/dbconnection')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
import CONFIG from '../../config/config'

router.post('/login', (req, res) => {
	let username = req.body.username
	let password = req.body.password;
	let sql = 'SELECT * FROM users WHERE username = ?'
	if (username && password) {
		db.query(sql, [username], function (error, results, fields) {

			if (results.length) {
				let user = results[0]
				const match = bcrypt.compareSync(password, user.passwd)
				delete user.passwd

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

		})
	} else {
		res.json({
			success: false,
			data: "Authentication failed! Please check the request"
		})
	}
})

export default router