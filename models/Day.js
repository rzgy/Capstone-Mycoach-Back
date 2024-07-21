const mongoose = require("mongoose");
const Excercies = require("./Excercies");

const DaySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  Excercies: [Excercies],
});
