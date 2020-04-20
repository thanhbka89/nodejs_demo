import mongoose from 'mongoose'
import CONFIG from '../../config'
import UserModel from './user.model'
import node_acl from 'acl'

export let acl = null

export default {
  mongoose,
  url: CONFIG.mongo,
  users: UserModel(mongoose),
}

export class DBMongo {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose
      .connect(CONFIG.mongo, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        // autoIndex: false, // on product
      })
      .then(() => {
        console.log('[MongoDB] Connect successfully!')
        acl = new node_acl(
          new node_acl.mongodbBackend(mongoose.connection.db, '_acl_')
        )
      })
      .catch((e) => {
        console.log('[MongoDB] Connection error!', e.message)
      })
  }
}
