import api from '@/api'

const resource = '/code'

export default {
  list() {
    return api.request('get', `${resource}`)
  },

  create(payload) {
    return api.request('post', `${resource}`, payload)
  },

  getById(id) {
    return api.request('get', `${resource}/${id}`)
  },

  update(id, payload) {
    return api.request('put', `${resource}/${id}`, payload)
  },

  delete(id) {
    return api.request('delete', `${resource}/${id}`)
  },

  count() {
    return api.request('get', `${resource}/get/count`)
  },

  paginate(page) {
    return api.request('get', `${resource}/p/${page}`)
  },

  findCategory(category) {
    return api.request('get', `${resource}/category/${category}`)
  }

}
