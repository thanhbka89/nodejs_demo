import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import {
  PRODUCT_ORDER_STATUS_ACCEPTED,
  PRODUCT_ORDER_STATUS_DELIVERING,
  PRODUCT_ORDER_STATUS_FINISHED,
  PRODUCT_ORDER_STATUS_PACKAGING,
  PRODUCT_ORDER_STATUS_PENDING,
  PRODUCT_ORDER_STATUS_REJECTED
} from '@src/constants/models'

const schema = mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    affiliate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Affiliate',
    },
    quantity: {
      type: Number,
    },
    amount: {
      type: Number,
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
    collection: 'order_detail'
  }
)

schema.plugin(paginate)

const OrderDetail = mongoose.model('OrderDetail', schema)

export default OrderDetail
