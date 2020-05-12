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
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    abs_distance: {
      type: Number,
    },
    rel_distance: {
      type: Number,
    },
    parent_agency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agency',
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

const Agency = mongoose.model('Agency', schema)

export default Agency
