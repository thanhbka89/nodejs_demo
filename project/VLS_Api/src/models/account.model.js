import mongoose from 'mongoose'
import { hashSync, compareSync } from 'bcrypt'
import paginate from 'mongoose-paginate-v2'

import {
  ACCOUNT_LEVEL_GOLD,
  ACCOUNT_LEVEL_SILVER,
  ACCOUNT_LEVEL_PLATINUM,
  ACCOUNT_LEVEL_BRONZE,
} from '@src/constants/models'

const schema = mongoose.Schema(
  {
    surname: {
      type: String,
    },
    firstname: {
      type: String,
    },
    fullname: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    address: {
      type: String,
    },
    // tách tên tỉnh thành từ địa chỉ để làm thống kê
    city: {
      type: String,
    },
    // nghề chính
    work1: {
      type: String,
    },
    // nghề phụ
    work2: {
      type: String,
    },
    role: {
      type: String,
      default: 'basic',
      enum: ['basic', 'supervisor', 'admin'],
    },
    roles: [
      {
        type: String,
      },
    ],
    level: {
      type: String,
      enum: [
        ACCOUNT_LEVEL_BRONZE,
        ACCOUNT_LEVEL_GOLD,
        ACCOUNT_LEVEL_SILVER,
        ACCOUNT_LEVEL_PLATINUM,
      ],
      default: ACCOUNT_LEVEL_BRONZE,
    },
    point: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    google_id: {
      type: String,
    },
    facebook_id: {
      type: String,
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
    is_staff: {
      type: String,
      default: false,
    },
    // thời điểm user join công ty làm nhân viên
    joined_at: {
      type: Date,
    },
    // chức vụ của nhân viên
    title: {
      type: String,
    },
    // đại lý mà nhân viên này tham gia
    agency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agency',
    },
    password: {
      type: String,
      required: true,
    },
    accessToken: String,
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

schema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'created_by'
})

if (!schema.options.toObject) schema.options.toObject = {}

schema.options.toObject.transform = function (doc, ret, options) {
  console.log('[account.model] toObject')
  ret.id = ret._id.toString()
  delete ret._id
  delete ret.__v
  delete ret.password
  
  return ret
}

// quá nhiều vòng lặp sẽ làm tăng đáng kể thời gian response, ví dụ 17 round salt mất 10s để response, 7 round salt mất 55ms
const hashPassword = (password) => hashSync(password, 7)

const extractCity = (text) => {
  const items = text.split(',')
  const last = items[items.length - 1].trim()
  if (last.toLowerCase().startsWith('tỉnh ')) {
    return last.slice(5).trim()
  } else if (last.toLowerCase().startsWith('thành phố ')) {
    return last.slice(10).trim()
  } else if (last.toLowerCase().startsWith('tp ')) {
    return last.slice(3).trim()
  }
}

schema.method('toJSON', function () {
  console.log('[account.model] toOJSON')
  const { __v, _id, ...object } = this.toObject()
  delete object.__v
  delete object.password

  return object
})

schema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = hashPassword(this.password)
  }
  if (!this.city && this.address) {
    this.city = extractCity(this.address)
  }
  next()
})

schema.methods.comparePassword = function (password) {
  return compareSync(password, this.password)
}

schema.pre(['update', 'updateOne', 'findOneAndUpdate'], function (next) {
  // this.getUpdate() trả về object ({ ..., $set: {...}, $setOnInsert: {...}}) chứa các field
  // mà giá trị sẽ được cập nhật, ngoài ra có thêm 2 fields đặc biệt
  // - $set: là object chứa các trường field do Mongoose tự động cập nhật ví dụ updatedAt
  // - $setOnInsert: là object chứa các trường sẽ được insert vào Mongo nếu upsert=true
  // Tóm lại $set và $setOnInsert nên dùng khi bạn muốn cập nhật một hay các field nào đó mà
  // khi truyền tham số cho các hàm update/updateOne/findOneAndUpdate bạn chưa có điều kiện
  // để truyền vào.
  console.log('[account.model.UPDATE]')
  const password = this.getUpdate().password
  if (password) {
    this.getUpdate().password = hashPassword(password)
  }
  const { address, city } = this.getUpdate()
  if (!city && address) {
    this.getUpdate().city = extractCity(address)
  }
  next()
})

schema.pre(/^find/, function() {
  console.log('[account.model.FIND]', this instanceof mongoose.Query)
})

schema.plugin(paginate)

schema.index({
  mobile: 1,
})

schema.index({
  fullname: 1,
})

const Account = mongoose.model('Account', schema)

export default Account
