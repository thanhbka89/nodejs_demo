import Controller from '@src/controllers/BaseController'
import Service from '@src/services/order.service'
import Model from '@src/models/order.model'
import OrderDetailService from '@src/services/orderDetail.service'
import OrderDetailModel from '@src/models/order_detail.model'

const objService = new Service(Model)
const orderDetailService = new OrderDetailService(OrderDetailModel)
class OrderController extends Controller {
  constructor(service) {
    super(service)
  }

  async createOrder(req, res) {
    let success = true
    const errors = []
    let result = null

    const order = await objService.create(req.body)
    const { items = [] } = req.body

    if (order && items.length) {
      const requests = items
        .map(async (item) => {
          item = {...item, order: order._id } // copy obj
          return orderDetailService.create(item)
            .catch((e) => {
              success = false
              errors.push(e.message)
              console.log(`[E.OrderDetail] - ${e.message}`)
              // throw e
            })
        })
        // console.log(requests)
        await Promise.all(requests)
          .then((response) => {          
            console.log(`[S.CreateOrder] - ${response}`)
          })
          .catch((e) => console.log(`[E.CreateOrder] - ${e}`))        
    }   
    
    res.json({ success, data: order, errors, result})
  }

  // async createOrderDetail(order, items) {
  //   const requests = items
  //     .map(async (item) => {
  //       item = {...item, order: order._id } // copy obj
  //       return orderDetailService.create(item)
  //         .catch((e) => {
  //           console.log(`[E.OrderDetail] - ${e.message}`)
  //         })
  //     })

  //     return Promise.all(requests)
  // }
}

export default new OrderController(objService)
