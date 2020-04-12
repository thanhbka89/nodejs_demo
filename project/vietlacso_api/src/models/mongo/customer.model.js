import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const CustomerSchema = new Schema(
	{
        account_id: String,
        account_code: String,
		account_name: String,
		address: String,
        phone: String,
        email: String,
        manager_email: String,
        manager_user_name: String,
        website: String,
        logo: String,
        birthday: String,
        description: String,
        account_type: String,
        gender: Number,
        refer: String,
        contacts: [{
            contact_id: String,
            first_name: String,
            last_name: String,
            phone_mobile: String,
            email: String,
            title: String,
            description: String
        }]
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
)

CustomerSchema.plugin(mongoosePaginate)

export default mongoose.model('customers', CustomerSchema)
