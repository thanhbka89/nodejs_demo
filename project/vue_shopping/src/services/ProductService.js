import http from '../http-common'

class ProductService {
	healcheck() {
		return http.get('/public')
	}

	find(filter = {}) {
		const { page = 1, limit = 10 } = filter
		let query = `page=${page}&limit=${limit}`
		return http.get(`/public/product?${query}`)
	}

	get(id) {
		return http.get(`/tutorials/${id}`)
	}

	create(data) {
		return http.post('/tutorials', data)
	}

	update(id, data) {
		return http.put(`/tutorials/${id}`, data)
	}

	delete(id) {
		return http.delete(`/tutorials/${id}`)
	}

	deleteAll() {
		return http.delete(`/tutorials`)
	}

	findByTitle(title) {
		return http.get(`/tutorials?title=${title}`)
	}
}

export default new ProductService()
