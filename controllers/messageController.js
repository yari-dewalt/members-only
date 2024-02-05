const Message = require("../models/message");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find().sort({ date: 1 }).populate("user").exec();
  res.render("index", {
    messages: allMessages
  });
});

exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.render("message_form", { title: "Create new message"});
});

exports.message_create_post = [
  body("text", "Text must be less than 200 characters")
  .trim()
  .isLength({ min: 1, max: 200 })
  .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const testUser = await User.findOne({ name: "Test User" });
    const message = new Message({ text: req.body.text, timestamp: new Date(), user: testUser });

    if (!errors.isEmpty()) {
      res.render("message_form", {
        title: "Create new message",
        message: message,
        errors: errors.array()
      });
    } else {
      await message.save();
      testUser.messages.push(message);
      await testUser.save();
      res.redirect("/");
    }
  })
];
