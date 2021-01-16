import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const schema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    beginat: {
      type: Date,
    },
    endat: {
      type: Date,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    // thông tin về chính sách giá, điểm thưởng, ... áp cho các sản phẩm trong chiến dịch
    metadata: {
      type: Object,
    },
    active: {
      type: Boolean,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
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

const Campaign = mongoose.model('Campaign', schema)

export default Campaign
