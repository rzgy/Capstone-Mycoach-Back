const express = require("express");
const passport = require("passport");
const messageRouter = express.Router();

const { addMessage, getMessages } = require("./controllers");

messageRouter.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  addMessage
);

messageRouter.get(
  "/getMessages/:userId",
  passport.authenticate("jwt", { session: false }),
  getMessages
);

messageRouter.get(
  "/getMessagesUser/:userId",
  passport.authenticate("jwt-user", { session: false }),
  getMessages
);
module.exports = messageRouter;
