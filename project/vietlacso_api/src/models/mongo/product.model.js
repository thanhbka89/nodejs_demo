import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const ProductSchema = new Schema(
	{
        product_id: Number,
        product_code: String,
        product_name: String,
		product_vat: String,
		manufacturer_id: String,
        description: String,
        category_id: String,
        unit_id: String,
        cover_price: String,
        discount: String,
        created_at: String,
        updated_at: String,
        price: String,
        amount: String
	},
	{ timestamps: true }
)

ProductSchema.plugin(mongoosePaginate)

export default mongoose.model('products', ProductSchema)
