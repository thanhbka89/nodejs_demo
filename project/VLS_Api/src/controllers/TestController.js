import Controller from './BaseController'
import TestService from '../services/test.service'
import PaymentLog from '../models/payment_log.model'

const testService = new TestService(PaymentLog)

class TestController extends Controller {
  constructor(service) {
    super(service)
  }
}

export default new TestController(testService)
