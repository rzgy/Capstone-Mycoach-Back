const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  endDay: {
    type: Number,
    required: true,
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "coach",
    required: true,
  },
});

module.exports = mongoose.model("Plan", PlanSchema);
