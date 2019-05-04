import { VSM_API } from '@/services/Api'

export default {
  mockFetchUsers () {
    // return VSM_API.get('https://599f807effe73c0011b9fcc5.mockapi.io/api/user')
    return VSM_API.get('https://api.github.com/search/users?q=location:delhi')
  }
}
