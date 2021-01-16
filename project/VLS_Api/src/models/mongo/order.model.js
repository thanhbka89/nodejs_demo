import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const OrderSchema = new Schema(
	{
        order_id: Number,
        order_code: String,
		order_type: Number,
		amount: String,
        discount: String,
        account_id: Number,
        account_code: String,
        account_name: String,
        status: Number,
        order_date: String,
        created_date: String,
        assigned_user: String,
        assigned_name: String
	},
	{ timestamps: true }
)

OrderSchema.plugin(mongoosePaginate)

export default mongoose.model('orders', OrderSchema)
