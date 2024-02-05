const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 20 },
  username: { type: String, required: true, minLength: 1, maxLength: 50 },
  password: { type: String, required: true, minLength: 1, maxLength: 30 },
  messages: { type: [Schema.Types.ObjectId], ref: "Message" }
}, { collection: "users" });

module.exports = mongoose.model("User", UserSchema);
