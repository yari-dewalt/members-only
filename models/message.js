const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: { type: String, required: true, minLength: 1, maxLength: 200 },
  timestamp: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { collection: "messages" });

MessageSchema.virtual("formatted_date_and_time").get(function() {
  return DateTime.fromJSDate(this.timestamp).toLocaleString({ month: "numeric", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
});

module.exports = mongoose.model("Message", MessageSchema);
