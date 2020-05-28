import axios from 'axios'
import { getToken } from './services/JwtService'

export default axios.create({
	withCredentials: true,
	baseURL: 'http://localhost:3000/api/v1/',
	timeout: 120000,
	headers: {
		'Content-type': 'application/json',
		Authorization: `Bearer ${getToken()}`,
	},
})
