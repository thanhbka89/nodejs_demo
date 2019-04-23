const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  description: String
});

const User = mongoose.model("User", PostSchema);
module.exports = User;