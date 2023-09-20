const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    require: true,
  },
});

const OauthUserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
});

//const OauthUserSchema = new Schema({});
const User = mongoose.model("User", userSchema, "users");

const OAuthUser = mongoose.model("OAuthUser", OauthUserSchema, "users");
module.exports = {
  User,
  OAuthUser,
};