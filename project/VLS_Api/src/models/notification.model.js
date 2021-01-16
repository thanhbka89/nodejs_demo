import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const schema = mongoose.Schema(
  {
    // hoặc là kênh broadcast hoặc là kênh private dành cho mỗi client
    channel_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    // mô tả ngắn gọn của thông báo
    snippet: {
      type: String,
    },
    snippet_type: {
      type: String,
      default: 'html',
      enum: ['json', 'html'],
    },
    // nội dung đầy đủ của thông báo
    content: {
      type: String,
    },
    content_type: {
      type: String,
      default: 'html',
      enum: ['json', 'html'],
    },
    // 0 nếu notify 1 lần, ngược lại notification sẽ được lặp lại loop_count lần sau interval mili giây, măc định là 0
    loop_count: {
      type: Number,
      default: 0,
    },
    // khoảng thời gian thông báo được lặp lại, chỉ dùng nếu loop_count > 0
    interval: {
      type: Number,
      default: 0,
    },
    // action sẽ thực hiện khi user tương tác với notification, ví dụ touch to open
    target_url: {
      type: String,
    },
    is_deleted: {
      type: Boolean,
      default: false,
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

const Notification = mongoose.model('Notification', schema)

export default Notification
