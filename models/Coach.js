const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    default: "../../media/ProfilePic.jpg",
  },
  chatRooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "ChatRoom",
    },
  ],
});

module.exports = mongoose.model("Coach", CoachSchema);
