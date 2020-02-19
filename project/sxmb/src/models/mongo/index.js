import dbConfig from '../../config'
import mongoose from 'mongoose'
import UserModel from './user.model'

mongoose.Promise = global.Promise

export default {
    mongoose,
    url: dbConfig.mongo,
    users: UserModel(mongoose)
}
