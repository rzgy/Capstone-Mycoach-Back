const express = require("express");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  getUsers,
  getMyProfile,
  updateMyProfile,
  getUserById,
} = require("./controllers");
const upload = require("../../middlewares/multer");

const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), registerUser);
userRouter.post(
  "/login",
  passport.authenticate("local-user", { session: false }),
  loginUser
);
userRouter.get(
  "/",
  //  passport.authenticate("jwt", { session: false }),
  getUsers
);
userRouter.get(
  "/myprofile",
  passport.authenticate("jwt-user", { session: false }),
  getMyProfile
);
userRouter.get(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  getUserById
);
userRouter.put(
  "/myprofile",
  passport.authenticate("jwt-user", { session: false }),
  upload.single("image"),
  updateMyProfile
);

module.exports = userRouter;
