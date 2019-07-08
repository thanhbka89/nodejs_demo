import axios from 'axios'

// ref: https://github.com/christiannwamba/vue-auth-vuex

export default {
  login({commit}, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({ url: 'http://localhost:3000/login', data: user, method: 'POST' })
      .then(resp => {
        const token = resp.data.token
        const user = resp.data.user
        localStorage.setItem('token', token)
        // Add the following line:
        axios.defaults.headers.common['Authorization'] = token
        commit('auth_success', token, user)
        resolve(resp)
      })
      .catch(err => {
        commit('auth_error')
        localStorage.removeItem('token')
        reject(err)
      })
    })
  },
  register({commit}, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({ url: 'http://localhost:3000/register', data: user, method: 'POST' })
      .then(resp => {
        const token = resp.data.token
        const user = resp.data.user
        localStorage.setItem('token', token)
        // Add the following line:
        axios.defaults.headers.common['Authorization'] = token
        commit('auth_success', token, user)
        resolve(resp)
      })
      .catch(err => {
        commit('auth_error', err)
        localStorage.removeItem('token')
        reject(err)
      })
    })
  },
  logout({commit}) {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}
