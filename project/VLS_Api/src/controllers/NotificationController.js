import Controller from '@src/controllers/BaseController'
import Service from '@src/services/notification.service'
import Model from '@src/models/notification.model'

const objService = new Service(Model)

class NotificationController extends Controller {
  constructor(service) {
    super(service)
  }
}

export default new NotificationController(objService)
