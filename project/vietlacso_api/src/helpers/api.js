import axios from 'axios'
import config from '../config'

export default {
  request(method, uri, data = null) {
    if (!method || !uri) 
      return

    let url = config.vietlac_getfly_crm.base_url + uri
    let headers = {
      'content-type': 'application/json',
      'X-Authorization': 'Bearer ' + process.env.GETFLY_JWT,
      'X-API-KEY': process.env.API_KEY_GETFLY || config.vietlac_getfly_crm.api_key
    }

    return axios({
      method,
      url,
      data,
      headers,
    })
  },
}

export const API_COMMON = axios.create({
  headers: { 'Content-Type': 'application/json' },
})
