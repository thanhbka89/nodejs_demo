import api, { G_API } from '@/api'

class Common {
    getAll() {
      return api.get(`/tutorials`)
    }
  
    get(id) {
      return api.get(`/tutorials/${id}`)
    }

    getCoin(coin) {
        return G_API.get(`https://api.coinmarketcap.com/v1/ticker/${coin}/`)
    }
}

export default new Common()