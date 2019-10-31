import api from '@/api'

const resource = '/setting'

export default {
  get() {
    return api.request('get', `${resource}`)
  },

  create(payload) {
    return api.request('post', `${resource}`, payload)
  },

  getById(id) {
    return api.request('get', `${resource}/${id}`)
  },

  getByName(name) {
    return api.request('get', `${resource}/get/by_name/?name=${name}`)
  },

  update(id, payload) {
    return api.request('put', `${resource}/${id}`, payload)
  },

  delete(id) {
    return api.request('delete', `${resource}/${id}`)
  }
}
