const Coach = require("../../models/Coach");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (coach) => {
  const payload = {
    email: coach.email,
    _id: coach._id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET);
};

exports.getCoach = async (req, res, next) => {
  try {
    console.log(req.body.email);
    const coach = await Coach.findOne({ email: req.body.email });
    console.log("coach", coach);
    if (!coach) return res.status(404).json({ message: "Coach is Not Found" });
    return res.status(200).json(coach);
  } catch (error) {
    next(error);
  }
};
exports.register = async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const newCoach = await Coach.create(req.body);

    const token = generateToken(newCoach);

    return res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    return res.status(201).json({ token });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getCoaches = async (req, res, next) => {
  try {
    const coach = await Coach.find();
    res.status(200).json(coach);
  } catch (err) {
    next(err);
  }
};

exports.getMyProfileCoach = async (req, res, next) => {
  try {
    const coach = await Coach.findById(req.user._id).select("-password");
    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }
    res.status(200).json(Coach);
  } catch (err) {
    next(err);
  }
};

exports.updateMyProfileCoach = async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    const coach = await Coach.findByIdAndUpdate(
      req.coach._id,
      { $set: req.body },
      { new: true }
    ).select("-password");
    if (!coach) {
      return res.status(404).json({ message: "coach not found" });
    }
    res.status(200).json(coach);
  } catch (err) {
    next(err);
  }
};

exports.getCoachById = async (req, res, next) => {
  try {
    console.log(req.params._id);
    const coach = await Coach.findById(req.params._id).select("-password");
    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }
    res.status(200).json(coach);
  } catch (err) {
    next(err);
  }
};
