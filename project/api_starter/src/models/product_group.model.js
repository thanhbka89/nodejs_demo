import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    active: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: false
    },
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
    collection: 'product_groups'
  }
)

schema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'product_group'
})

schema.index({
  name: 1,
})

schema.plugin(paginate)

const ProductGroup = mongoose.model('ProductGroup', schema)

export default ProductGroup
