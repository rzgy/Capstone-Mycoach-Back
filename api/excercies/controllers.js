const Exercises = require("../../models/Exercises");

const createExercise = async (req, res, next) => {
  try {
    req.body.user = req.params.athleteId;
    const newExcercise = await Exercises.create(req.body);
    res.status(201).json(newExcercise);
  } catch (error) {
    next(error);
  }
};

const getUserExercises = async (req, res, next) => {
  try {
    const exercises = await Exercises.find({ user: req.params.athleteId });
    res.status(201).json(exercises);
  } catch (err) {
    next(err);
  }
};

const updateExercise = async (req, res, next) => {
  try {
    console.log(req.body);
    const exercise = await Exercises.findById(req.params.exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    exercise.set(req.body);
    await exercise.save();
    res.status(200).json(exercise);
  } catch (error) {
    next(error);
  }
};

const deleteExercise = async (req, res, next) => {
  try {
    const exercise = await Exercises.findById(req.params.exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    await exercise.deleteOne();
    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createExercise,
  getUserExercises,
  updateExercise,
  deleteExercise,
};
