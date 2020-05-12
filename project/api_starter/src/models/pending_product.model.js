import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const schema = mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    // tên sản phẩm
    name: {
      type: String,
    },
    // mô tả sản phẩm
    description: {
      type: String,
    },
    // giá nhập
    price_import: {
      type: Number,
    },
    // số lượng nhập
    amount: {
      type: Number,
    },
    // chiết khấu giá nhập
    discount_import: {
      type: Number,
    },
    // mã sản phẩm đối tác cung cấp
    sku1: {
      type: String,
    },
    // mã sản phẩm sau khi hiệu chỉnh để khớp với sản phẩm trong kho để hiển thị tới enduser
    sku2: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    product_group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductGroup',
    },
    made_in: {
      type: String,
    },
    warrant: {
      type: Object,
    },
    supplier: {
      type: String,
    },
    unit: {
      type: String,
    },
    verified: {
      type: Boolean,
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
  }
)

schema.plugin(paginate)

const PendingProduct = mongoose.model('PendingProduct', schema)

export default PendingProduct
