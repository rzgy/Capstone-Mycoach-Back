const Plan = require("../../models/Plan");
const Coach = require("../../models/Coach");
const Ingredient = require("../../models/Ingredient");
const User = require("../../models/User");

const getplans = async (req, res, next) => {
  try {
    const plans = await Plan.find();
    res.status(201).json(plans);
  } catch (err) {
    next(err);
  }
};

const getPlan = async (req, res) => {
  try {
    const Plan = await Plan.findById(req.params.id).populate("coach");
    res.json(Plan);
  } catch (error) {
    res.status(500).send("Error fetching Plan");
  }
};

const createPlan = async (req, res, next) => {
  console.log("test", req.body);
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    req.body.userId = req.user._id;
    const { startDate, coach, day, endDay } = req.body;

    const Plan = await Plan.create({
      startDate,
      coach,
      day,
      endDay,
    });

    await coach.updateMany(
      { _id: { $in: coach } },
      { $push: { Plan: Plan._id } }
    );

    console.log(coach);
    if (Plan) {
      await coach.findByIdAndUpdate(coach, {
        $push: { plans: Plan._id },
      });
    }

    // req.body.userId = req.user;
    // const Plan = await Plan.create(req.body);
    // await User.findByIdAndUpdate(req.user._id, {
    //   $push: { urls: Plan._id },

    res.status(201).json("Plan created!");
  } catch (err) {
    next(err);
  }
};

const updatePlan = async (req, res, next) => {
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    const Plan = await Plan.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json(Plan);
  } catch (err) {
    next(err);
  }
};

const deletePlan = async (req, res, next) => {
  try {
    const Plan = await Plan.findByIdAndDelete(req.params.id);
    res.status(201).json(Plan);
  } catch (err) {
    next(err);
  }
};

const getPlansByUser = async (req, res, next) => {
  try {
    const userId = req.params.userid;
    console.log(userId);
    const plans = await Plan.find({ userId: userId }).populate("coach");
    res.status(201).json(plans);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getplans,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
  getPlansByUser,
};
