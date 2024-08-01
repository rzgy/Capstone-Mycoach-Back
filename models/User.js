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
    type: Number,
    required: true,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
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
    default: "media/ProfilePic.jpg",
  },
});

module.exports = mongoose.model("User", UserSchema);
