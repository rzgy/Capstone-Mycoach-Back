const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    email: user.email,
    _id: user._id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET);
};

exports.registerUser = async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create(req.body);

    const token = generateToken(newUser);

    return res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    return res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getMyProfile = async (req, res, next) => {
  try {
    console.log("this");
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
exports.getUserById = async (req, res, next) => {
  try {
    console.log("first");
    console.log(req.params._id);
    const user = await User.findById(req.params._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateMyProfile = async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true }
    ).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
