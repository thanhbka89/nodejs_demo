import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const schema = mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    point: {
      type: Number,
    },
    reason: {
      type: String,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductOrder',
    },
    amount_paid: {
      type: Number,
    },
    // tỉ lệ chuyển đổi giữa point và tiền mặt
    point_exchange: {
      type: Number,
    },
    method: {
      type: String,
      enum: ['money', 'point'],
      default: 'money'
    },
    ship_paid: {
      type: Number,
    },
    transaction: {
      type: String,
      enum: ['purchase', 'reward', 'recharge'],
      default: 'purchase',
      required: true,
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
    collection: 'payment_logs'
  }
)

schema.plugin(paginate)

const PaymentLog = mongoose.model('PaymentLog', schema)

export default PaymentLog
