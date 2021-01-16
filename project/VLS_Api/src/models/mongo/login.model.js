import mongoose from 'mongoose'

const Schema = mongoose.Schema

const LoginSchema = new Schema(
  {
    username: { type: String, default: '' },
    password: { type: String, default: '' },
    loginAt: { type: Date, default: Date.now },
    logoutAt: { type: Date, default: Date.now },
    action: { type: String, default: 'System' },
  },
  { collection: 'login' }
)

export default mongoose.model('login', LoginSchema)
