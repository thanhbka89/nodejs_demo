import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TokenSchema = new Schema(
  {
    token: String,
    host: String,
    type: {
      type: String,
      default: 'json_web_token',
      enum: ['json_web_token', 'api_key_scret'],
    },
    status: Boolean,
  },
  { timestamps: true }
)

export default mongoose.model('tokens', TokenSchema)
