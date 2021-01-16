import Controller from '@src/controllers/BaseController'
import Service from '@src/services/manufacturer.service'
import Model from '@src/models/manufacturer.model'

const objService = new Service(Model)

class ManufacturerController extends Controller {
  constructor(service) {
    super(service)
  }

  async getProduct(req, res) {    
    const data = await objService.getProducs(req.params.nsxId, req.query)

    res.json({ success: true, data: data.products })
  }
}

export default new ManufacturerController(objService)

//   getProduct: async (req, res) => {
//     const data = await ManufacturerService.getProducs(req.params.nsxId, req.query)

//     res.json({ success: true, data: data.products })
//   },
// }
