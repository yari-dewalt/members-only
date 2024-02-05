const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
require("dotenv").config();

const router = require("./routes/router");

const app = express();

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected to MongoDB!");
}
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", router);

app.listen(3000, () => console.log("App listening on port 3000"));
