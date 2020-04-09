import mongoose from 'mongoose'
import dbConfig from '../../config'
import UserModel from './user.model'
import node_acl from 'acl'

export let acl = null

export default {
  mongoose,
  url: dbConfig.mongo,
  users: UserModel(mongoose),
}

export class DBMongo {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose
      .connect(dbConfig.mongo, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      })
      .then(() => {
        console.log('DB Mongo connection successfully!')
        acl = new node_acl(new node_acl.mongodbBackend(mongoose.connection.db, 'acl_'))
      })
      .catch((e) => {
        console.log('DB Mongo connection error!', e.message)
      })
  }
}
