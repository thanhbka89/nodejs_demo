import mongoose from 'mongoose'
import dbConfig from '../../config'
import UserModel from './user.model'

// mongoose.Promise = global.Promise

export default {
  mongoose,
  url: dbConfig.mongo,
  users: UserModel(mongoose)
}

export class DBMongo {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose
      .connect(dbConfig.mongo, { useUnifiedTopology: true, useNewUrlParser: true })
      .then(() => {
        console.log('DB Mongo connection successfully!')
      })
      .catch(e => {
        console.log('DB Mongo connection error!', e.message)
      })
  }
}
