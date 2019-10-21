import axios from 'axios'
import config from '@/config'

export default {
  request(method, uri, data = null) {
    if (!method) {
      return
    }

    if (!uri) {
      return
    }

    let url = config.serverURI + uri
    let headers = {
      'content-type': 'application/json'
    }

    const AUTH_TOKEN = localStorage.getItem('token')
    if (AUTH_TOKEN) {
      // headers['Authorization'] = AUTH_TOKEN
      axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
    }

    return axios({
      method,
      url,
      data,
      headers
    })
  }
}

export const BN_API = axios.create({
  headers: {'Content-Type': 'application/json'}
})
