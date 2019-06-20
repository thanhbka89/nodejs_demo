import axios from 'axios'
import config from '../config'

export default {
  request(method, uri, data = null) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
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
