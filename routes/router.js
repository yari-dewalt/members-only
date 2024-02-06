const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

router.get("/", message_controller.index);

/// USERS ///
router.get("/signup", user_controller.user_create_get);

router.post("/signup", user_controller.user_create_post);

router.get("/login", user_controller.user_login_get);

router.post("/login", user_controller.user_login_post);

router.post("/make-member", user_controller.user_make_member);

/// MESSAGES ///
router.get("/newmessage", message_controller.message_create_get);

router.post("/newmessage", message_controller.message_create_post);

module.exports = router;
