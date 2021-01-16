import BaseService from '@src/services/base.service'
import { findByIdAndUpdate } from '@src/services/account.service'

class PaymentLogService extends BaseService {
  constructor(model) {
    super(model)
  }

  async addPointToUser(userId, point) {
    return findByIdAndUpdate(userId, { $inc: { point } })
  }
}

export default PaymentLogService
