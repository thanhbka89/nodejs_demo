import KiemKe from '../models/KiemKe'
import Inventory from '../models/Inventory'
import TransactionDetail from '../models/TransactionDetail'
import Item from '../models/Item'

async function queryKiemKe(query = {}) {
  let response = {
    success: false,
    data: null
  }
  try {
    const result = await KiemKe.paginate(query)
    response = {
      success: true,
      data: result
    }
  } catch (e) {
    response.data = e
  }

  return response
}

async function queryInventory(query = {}) {
  let response = {
    success: false,
    data: null
  }
  try {
    const result = await Inventory.paginate(query)
    response = {
      success: true,
      data: result
    }
  } catch (e) {
    response.data = e
  }

  return response
}

async function queryTransDetail(query = {}) {
  let response = {
    success: false,
    data: null
  }
  try {
    const result = await TransactionDetail.paginate(query)
    response = {
      success: true,
      data: result
    }
  } catch (e) {
    response.data = e
  }

  return response
}

const promiseQueryItem = (query = {}) => {
  return new Promise((resolve, reject) => {
    // Item.paginate(query, (err, resp) => {
    Item.getByCategory({category: '1,2,4', status: 1}, (err, resp) => {
      let response = {}
      if (err) {
        response.data = err
        reject(response)
      } else {
        response = {
          success: true,
          data: resp
        }
        resolve(response)
      }
    })
  })
}
  
module.exports = {
  queryKiemKe,
  queryInventory,
  queryTransDetail,
  queryItem: promiseQueryItem
}