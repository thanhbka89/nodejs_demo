export default mongoose => {
  const schema = mongoose.Schema(
    {
      username: String,
      is_admin: Boolean
    },
    { timestamps: true }
  )

  // override
  schema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id

    return object
  })

  const User = mongoose.model('users', schema)

  return User
}
