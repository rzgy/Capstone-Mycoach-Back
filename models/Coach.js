const mongoose = require("mongoose");

const CoachSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },

  gender: {
    type: String,
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
    required: true,
  },
});

module.exports = mongoose.model("Coach", CoachSchema);
