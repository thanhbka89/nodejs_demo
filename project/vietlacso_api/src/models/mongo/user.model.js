import bcrypt from 'bcrypt'

export default mongoose => {
  const schema = mongoose.Schema(
    {
      username: { type: String, required: [true, 'Please enter username'], unique: true, trim: true, minlength: 2 },
      password: { type: String, required: [true, 'Please enter password'], trim: true, minlength: 6 },
      email: { type: String, unique: true, required: true, trim: true },
      fullname: String,
      phone: String,
      address: String,
      role: {
        type: String,
        default: 'basic',
        enum: ["basic", "supervisor", "admin"]
      },
      accessToken: String,
      status: Boolean
    },
    { timestamps: true }
  )

  // override
  schema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id

    return object
  })

  schema.pre('save', function(next) {
    if (this.isModified('password')) {
      this.password = this.generateHash(this.password)
    }
    next()
  })

  schema.methods.generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  }

  schema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
  }

  const User = mongoose.model('users', schema)

  return User
}
