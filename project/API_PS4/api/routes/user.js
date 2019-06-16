import {
    Router
} from 'express';
// const cryptr = require('cryptr');
const db = require('../models/dbconnection');
let jwt = require("jsonwebtoken");
let config = require("../../config/config");

const router = Router();
let usersCtrl = require('../controllers/UsersController');

router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.users));
});

router.get('/get/:userId', (req, res) => {
    console.log(req.params);
    return res.send(req.context.models.users[req.params.userId]);
});

router.post('/user/login', (req, res) => {
    let username = req.body.username;
	let password = req.body.password;
	let sql = 'SELECT * FROM users WHERE username = ? AND passwd = ?';
	if (username && password) {
		db.query(sql, [username, password], function(error, results, fields) {
			
			if (results) {
				let token = jwt.sign({ username: username }, config.secret, {
					expiresIn: "24h" // expires in 24 hours
				});
				// return the JWT token for the future API calls
				res.json({
					success: true,
					data: "Authentication successful!",
					user: results[0].username,
					token: token
				});
			} else {
				res.json({
					success: false,
					data: "Incorrect username or password"
				  });
			}
		});
	} else {
		res.json({
			success: false,
			data: "Authentication failed! Please check the request"
		});
	}
});

router.get('/user/register', (req, res) => {
	let today = new Date();
	let user = {
		'username': req.body.username,
		'fullname': req.body.fullname,
		'nickname': req.body.nickname,
		'passwd': req.body.passwd,
		'phone': req.body.phone,
		'address': req.body.address,
		'created_by': 'SYSTEM',
		'updated_by': 'SYSTEM'
	}
	let sql = 'INSERT INTO users SET ?'
	db.query(sql, user, (err, response) => {
		if (err) {
			res.json({
				success: false,
				message: err
			});
		}
		res.json({
			success: true,
			message: 'Insert success!'
		});
	})

    console.log(today);
});

export default router;