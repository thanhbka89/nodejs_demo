import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const schema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductOrder',
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    // nhân viên tiếp nhận bảo hành, muốn biết nhân viên đã bán sản phẩm này xem ProductOrder
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    // thông tin chi tiết về bảo hành sản phẩm
    warrant: {
      type: Object,
    },
    // lý do bảo hành sản phẩm nếu có
    reason: {
      type: String,
    },
    // ngày giờ tiếp nhận sản phẩm bảo hành
    receivedAt: {
      type: Date,
    },
    // ngày giờ bàn giao sản phẩm bảo hành cho khách hàng
    handoverAt: {
      type: Date,
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

const Warranty = mongoose.model('Warranty', schema)

export default Warranty
