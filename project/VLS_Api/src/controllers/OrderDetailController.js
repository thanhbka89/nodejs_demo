import Controller from '@src/controllers/BaseController'
import Service from '@src/services/orderDetail.service'
import Model from '@src/models/order_detail.model'

const objService = new Service(Model)

class OrderDetailController extends Controller {
  constructor(service) {
    super(service)
  }
}

export default new OrderDetailController(objService)
