import api from '@/api'

const resource = '/user'

export default {
  list() {
    return api.request('get', `${resource}`)
  },

  get() {
    return api.request('get', `${resource}`)
  },

  create(payload) {
    return api.request('post', `${resource}`, payload)
  },

  register(payload) {
    return api.request('post', `${resource}/register`, payload)
  },

  getById(id) {
    return api.request('get', `${resource}/action/${id}`)
  },

  update(id, payload) {
    return api.request('put', `${resource}/action/${id}`, payload)
  },

  delete(id) {
    return api.request('delete', `${resource}/action/${id}`)
  },

  count() {
    return api.request('get', `${resource}/count`)
  },

  findCustomer() {
    return api.request('get', `${resource}/findCustomer`)
  },

  paginate(page) {
    return api.request('get', `${resource}/p/${page}`)
  },

  updateRank(payload) {
    return api.request('put', `${resource}/updateRank`, payload)
  }

}
