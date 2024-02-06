const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 20 },
  username: { type: String, required: true, minLength: 1, maxLength: 50 },
  password: { type: String, required: true, minLength: 1, maxLength: 60 },
  messages: { type: [Schema.Types.ObjectId], ref: "Message" },
  member: { type: Boolean, default: false }
}, { collection: "users" });

module.exports = mongoose.model("User", UserSchema);
