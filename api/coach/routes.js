const express = require("express");
const passport = require("passport");
const {
  register,
  login,
  getCoaches,
  getMyProfile,
  updateMyProfile,
} = require("./controllers");
const upload = require("../../middlewares/multer");

const coachRouter = express.Router();

coachRouter.post("/register", upload.single("image"), register);

coachRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);
coachRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getCoaches
);
coachRouter.get(
  "/myprofile",
  passport.authenticate("jwt", { session: false }),
  getMyProfile
);
coachRouter.put(
  "/myprofile",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateMyProfile
);

module.exports = coachRouter;
