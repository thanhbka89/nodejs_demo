import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const schema = mongoose.Schema(
  {
    pending_product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PendingProduct',
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    // số lượng sản phẩm cung cấp
    source_amount: {
      type: Number,
    },
    // số lượng sản phẩm trong kho hiện tại, sau khi import kết thúc số lượng sản phẩm sẽ tăng lên source_amount
    dest_amount: {
      type: Number,
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

const ProductImported = mongoose.model('ProductImported', schema)

export default ProductImported
