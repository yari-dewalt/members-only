const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
require("dotenv").config();



const app = express();

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected to MongoDB!");
}
app.set("views", __dirname);
app.set("view engine", "pug");

app.get("/", (req, res) =>
  res.send("Home page")
);

app.listen(3000, () => console.log("App listening on port 3000"));
