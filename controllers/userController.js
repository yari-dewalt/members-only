const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");

exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render("signup_form", { title: "Sign Up" });
});

exports.user_create_post = [
  body("name", "Name must be between 1 and 20 characters.")
  .trim()
  .isLength({ min: 1, max: 20 })
  .escape(),
  body("username", "Username must be between 1 and 50 characters.")
  .trim()
  .isLength({ min: 1, max: 50 })
  .escape(),
  body("password", "Password must be between 1 and 20 characters.")
  .trim()
  .isLength({ min: 1, max: 20 })
  .escape(),
  body("confirmpassword", "Passwords must match.")
  .custom((value, { req }) => {
    return value === req.body.password;
  })
  .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("signup_form", {
        title: "Sign Up",
        errors: errors.array()
      });
    } else {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
          if (err) {
            res.render("signup_form", {
              title: "Sign Up",
              user: user,
              errors: ["Could not hash password."]
            });
          }

          const user = new User({ name: req.body.name, username: req.body.username, password: hashedPassword });
          await user.save();
          return passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login"
          })(req, res, next);
        });
    }
  })
];

exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("login_form", { title: "Log In" });
});

exports.user_login_post = asyncHandler(async (req, res, next) => {
  return passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })(req, res, next);
});

exports.user_logout_get = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

exports.user_make_member = [
  body("code", "Incorrect code.")
  .custom((value, { req }) => {
    return process.env.MEMBER_CODE === req.body.code;
  })
  .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.redirect("/");
    } else {
      const user = await User.findById(res.locals.currentUser._id);
      user.member = true;
      await user.save();
      res.redirect("/");
    }
  })
];
