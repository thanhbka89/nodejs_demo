import Controller from '@src/controllers/BaseController'
import Service from '@src/services/suggestFriend.service'
import Model from '@src/models/suggest_friend.model'

const objService = new Service(Model)

class SuggestFriendController extends Controller {
  constructor(service) {
    super(service)
  }
}

export default new SuggestFriendController(objService)
