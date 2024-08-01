const mongoose = require("mongoose");

const ExercisesShcema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  day: { type: Date, required: true },
  name: { type: String, required: true },
  link: { type: String },
  sets: { type: Number, required: true },
  reps: { type: Number },
  weight: { type: Number },
});
module.exports = mongoose.model("Exercises", ExercisesShcema);
