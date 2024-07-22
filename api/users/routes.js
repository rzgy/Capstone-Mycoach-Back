const express = require("express");
const passport = require("passport");
const {
  register,
  loginUser,
  getUsers,
  getMyProfile,
  updateMyProfile,
} = require("./controllers");
const upload = require("../../middlewares/multer");

const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), register);
userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginUser
);
userRouter.get("/", passport.authenticate("jwt", { session: false }), getUsers);
userRouter.get(
  "/myprofile",
  passport.authenticate("jwt", { session: false }),
  getMyProfile
);
userRouter.put(
  "/myprofile",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateMyProfile
);

module.exports = userRouter;
