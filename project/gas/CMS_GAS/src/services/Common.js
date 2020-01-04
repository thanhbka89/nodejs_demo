import api, { G_API } from '@/api'

class Common { 
    get(id) {
      return api.get(`/tutorials/${id}`)
    }

    checkConnectApi() {
      return api.get(`/healthcheck/api`)
    }

    checkConnectDb() {
      return api.get(`/healthcheck/db`)
    }

    getCoin(coin) {
        return G_API.get(`https://api.coinmarketcap.com/v1/ticker/${coin}/`)
    }
}

export default new Common()