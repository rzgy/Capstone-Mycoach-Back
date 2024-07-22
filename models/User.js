const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Date,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },

  fullname: {
    type: String,

    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "ProfilePic.jpg",
  },
});

module.exports = mongoose.model("User", UserSchema);
