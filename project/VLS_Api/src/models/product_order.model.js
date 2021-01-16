import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import {
  PRODUCT_ORDER_STATUS_ACCEPTED,
  PRODUCT_ORDER_STATUS_DELIVERING,
  PRODUCT_ORDER_STATUS_FINISHED,
  PRODUCT_ORDER_STATUS_PACKAGING,
  PRODUCT_ORDER_STATUS_PENDING,
  PRODUCT_ORDER_STATUS_REJECTED,
  PAYMENT_METHOD_COD,
  PAYMENT_METHOD_BANK_CARD,
  PAYMENT_METHOD_ONLINE,
} from '@src/constants/models'

const schema = mongoose.Schema(
  {
    order: mongoose.ObjectId,
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    // nhân viên tiếp nhận và xử lý đơn hàng
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    affiliate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Affiliate',
    },
    status: {
      type: String,
      enum: [
        PRODUCT_ORDER_STATUS_REJECTED,
        PRODUCT_ORDER_STATUS_ACCEPTED,
        PRODUCT_ORDER_STATUS_DELIVERING,
        PRODUCT_ORDER_STATUS_FINISHED,
        PRODUCT_ORDER_STATUS_PACKAGING,
        PRODUCT_ORDER_STATUS_PENDING,
      ],
    },
    amount: {
      type: Number,
    },
    // lưu user-agent
    source_trace: {
      type: String,
    },
    browser_signature: {
      type: String,
    },
    payment: {
      type: String,
      enum: [
        PAYMENT_METHOD_ONLINE,
        PAYMENT_METHOD_COD,
        PAYMENT_METHOD_BANK_CARD,
      ],
    },
    // thông tin này sẽ được thêm vào sau khi đơn hàng chuyển trạng thái sang FINISHED
    warrant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warranty',
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
  }
)

schema.plugin(paginate)

const ProductOrder = mongoose.model('ProductOrder', schema)

export default ProductOrder
