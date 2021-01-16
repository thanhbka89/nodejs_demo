import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import slugify from 'slugify'

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: String,
    description: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    sku: {
      type: String,
    },
    // số lượng sản phẩm lúc nhập kho
    qty: {
      type: Number,
    },
    sold: {
      type: Number,
    },
    // số điểm tương ứng với giá sản phẩm
    point: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    discount_collaborator: {
      type: Number,
    },
    discount_agency: {
      type: Number,
    },
    discount_dropship: {
      type: Number,
    },
    product_group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductGroup',
    },
    manufacturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Manufacturer',
    },
    made_in: {
      type: String,
    },
    // các thông tin về bảo hành cho sản phẩm
    warrant: {
      type: Object,
    },
    supplier: {
      type: String,
    },
    vat: {
      type: Number,
    },
    // đơn vị sản phẩm
    unit: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false
    },
    commission_agency: {
      type: Number,
    },
    commission_affiliate: {
      type: Number,
    },
    is_freeship: {
      type: Boolean,
    },
    ships_fee: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    depth: {
      type: Number,
    },
    // các phương thức thanh toán được hỗ trợ khi mua sp
    payments: [
      {
        type: String,
      },
    ],
    pending: {
      type: Boolean,
    },
    // số điểm thưởng khi sản phẩm được mua
    reward_point: {
      type: Number,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Account',
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Account',
    },
    is_deleted: {
      type: Boolean,
      default: false
    },
    origin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    }
  },
  {
    collation: {
      locale: 'vi@collation=traditional',
      strength: 1, // so sánh string bỏ qua diacritics, ví dụ Tú và Tu là như nhau
      caseLevel: true, // sắp xếp string không tính đến hoa thường, ví dụ "A a B b" thay vì "a b A B" (chỉ có ý nghĩa khi strength < 3)
      normalization: true, // chuẩn hóa Unicode
      numericOrdering: true, // sắp xếp "số_10" ra sau "số_2" thay vì "số_2" đứng sau "số_10"
    },
    timestamps: true,
  }
)

schema.method('toJSON', function () {
  console.log('[product.model] toOJSON')
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  delete object.__v

  return object
})

schema.pre('save', async function (next) {
  console.log('[product.model] preHook.save')
  if (this.isModified('name')) {
    this.slug = slugify(this.name, '-')
  }
    
  next()
})

schema.post('save', async function (doc) {
  console.log('[product.model] post.save', doc)
})

schema.pre(['update', 'updateOne', 'findOneAndUpdate'], function (next) {
  console.log('[product.model] preHook.update')

  next()
})

schema.pre('remove', async function (next) {
  console.log('[product.model] preHook.remove')
  // delete relation collection
  // const user = this
  // await Post.deleteMany({author: user._id})
  next()
})

schema.plugin(paginate)

schema.index({
  name: 1,
})

const Product = mongoose.model('Product', schema)

export default Product
