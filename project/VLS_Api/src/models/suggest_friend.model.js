import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const schema = mongoose.Schema(
  {
    // nguoi xu ly
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    // nguoi gioi thieu
    referer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    // ten ban be
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate: {
        validator: (value) => {
          return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
            value
          )
        },
        message: (props) => `${props.value} không phải là email hợp lệ!`,
      },
    },
    phone: {
      type: String,
      required: true,
    },
    address: String,
    note: String,
    // Da thong bao se goi dien
    request_phone: Boolean,
    // Can goi lai ngay
    request_now: Boolean,
    // tinh trang xu ly, true: da lien lac
    status: {
      type: Boolean,
      default: false, // chua lien he
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
    collection: 'suggest_friend',
  }
)

schema.plugin(paginate)

const SuggestFriend = mongoose.model('SuggestFriend', schema)

export default SuggestFriend
