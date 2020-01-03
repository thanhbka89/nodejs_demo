import axios from 'axios'

// api local
export default axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-type': 'application/json'
  }
})

// api global
export const G_API = axios.create({
  headers: {'Content-Type': 'application/json'}
})
  