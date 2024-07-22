const express = require("express");
const upload = require("../../middlewares/multer");
const planRouter = express.Router();

const {
  getPlans,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
  getPlansByUser,
} = require("./controllers");

const passport = require("passport");

planRouter.get("/", getPlans);
planRouter.get("/:id", getPlan);
planRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createPlan
);
planRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updatePlan
);
planRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePlan
);

planRouter.get("/byuser/:userid", getPlansByUser);

module.exports = planRouter;
