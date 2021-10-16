import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const schema = mongoose.Schema(
  {
    method: {
      type: String,
    },
    url: {
      type: String,
    },
    body: {
      type: String,
    },
    ip: {
      type: String,
    },
    user_agent: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
)

schema.plugin(paginate)

const Log = mongoose.model('Log', schema)

export default Log
