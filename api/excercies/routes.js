const express = require("express");
const {
  createExercise,
  getUserExercises,
  updateExercise,
  deleteExercise,
} = require("./controllers");

const excerciesRouter = express.Router();

excerciesRouter.post("/create/:athleteId", createExercise);
excerciesRouter.get("/:athleteId", getUserExercises);
excerciesRouter.put("/update/:exerciseId", updateExercise);
excerciesRouter.delete("/delete/:exerciseId", deleteExercise);
module.exports = excerciesRouter;
