import axios from 'axios'
import CONFIG from '../config'

export default {
  request(method, uri, data = null) {
    if (!method || !uri) 
      return

    let url = CONFIG.vietlac_getfly_crm.base_url + uri
    let headers = {
      'content-type': 'application/json',
      'X-Authorization': 'Bearer ' + process.env.GETFLY_JWT,
      'X-API-KEY': process.env.API_KEY_GETFLY || CONFIG.vietlac_getfly_crm.api_key
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
