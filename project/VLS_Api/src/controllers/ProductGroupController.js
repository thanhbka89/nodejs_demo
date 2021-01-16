import Controller from '@src/controllers/BaseController'
import Service from '@src/services/productGroup.service'
import Model from '@src/models/product_group.model'

const objService = new Service(Model)

class ProductGroupController extends Controller {
  constructor(service) {
    super(service)
  }

  async getProduct(req, res) {
    const data = await objService.getProducs(req.params.groupId, req.query)

    res.json({ success: true, data: data.products })
  }
}

export default new ProductGroupController(objService)
