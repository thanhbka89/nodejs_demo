import bcrypt from 'bcrypt'

export default (mongoose) => {
  const schema = mongoose.Schema(
    {
      user_id: { type: Number, unique: true, required: true },
      username: {
        type: String,
        required: [true, 'Please enter username'],
        unique: true,
        trim: true,
        minlength: 2,
      },
      password: {
        type: String,
        default: '123456',
        trim: true,
        minlength: 6,
      },
      email: { type: String, unique: true, required: true, trim: true },
      fullname: String,
      phone: String,
      address: String,
      role: {
        type: String,
        default: 'basic',
        enum: ['basic', 'supervisor', 'admin'],
      },
      roles: { type: Array, default: [] },
      accessToken: String,
      status: Boolean,
      contact_name: String,
      dept_name: String,
      dept_id: Number,
      role_name: String,
      position_name: String,
      invalid: Number,
      contact_status: Number,
      is_active: Boolean,
    },
    { timestamps: true }
  )

  // override
  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id

    return object
  })

  schema.pre('save', function (next) {
    if (this.isModified('password')) {
      this.password = this.generateHash(this.password)
    }
    next()
  })

  schema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  }

  schema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }

  // schema.index({ email: 1 }) //Nơi đánh index

  const User = mongoose.model('users', schema)

  // emit an `index` event on the model when indexes are done building or an error occurred
  // User.on('index', function (err) {
  //   console.log('[userIndex]', err)
  // })

  return User
}
