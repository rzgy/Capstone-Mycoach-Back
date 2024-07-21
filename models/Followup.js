const mongoose = require("mongoose");

 const followUpSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    athlete: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: true,
    },
});

module.exports = mongoose.model("Followup", followUpSchema);