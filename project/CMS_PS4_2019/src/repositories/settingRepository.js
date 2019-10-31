import api from '@/api'

const resource = '/setting'

export default {
  get() {
    return api.request('get', `${resource}`)
  },

  create(payload) {

  },

  getById(id) {
    return api.request('get', `${resource}/detail/${id}`)
  }
}
