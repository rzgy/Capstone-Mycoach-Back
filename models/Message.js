const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    fromCoach: {
      type: Boolean,
      required: true,
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: function () {
        return this.fromCoach ? "Coach" : "User";
      },
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: function () {
        return this.fromCoach ? "User" : "Coach";
      },
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
    chatRoom: {
      type: Schema.Types.ObjectId,
      ref: "ChatRoom",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Message", messageSchema);
