const express = require("express");
const morgan = require("morgan");
const connectDB = require("./dataBase");
const app = express();
const errorHandler = require("./middlewares/errHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const {
  localStrategyUser,
  jwtStrategyUser,
} = require("./middlewares/PassportUser");
const coachRouter = require("./api/coach/routes");

const cors = require("cors");
const path = require("path");
const userRouter = require("./api/users/routes");
const planRouter = require("./api/plan/routes");
const excerciesRouter = require("./api/excercies/routes");

const { createServer } = require("http");
const { Server } = require("socket.io");
const chatRouter = require("./api/chat/routes");
const messageRouter = require("./api/messages/routes");
//init
require("dotenv").config();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
const port = process.env.PORT || 8000;
connectDB();

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);
passport.use("local-user", localStrategyUser);
passport.use("jwt-user", jwtStrategyUser);

app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/coaches", coachRouter);
app.use("/users", userRouter);
app.use("/plans", planRouter);
app.use("/exercises", excerciesRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

app.use(notFoundHandler);
app.use(errorHandler);

//socket.io
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("message", (message) => {
    console.log("socket message", message);
    io.emit("message", message);
  });
  // socket.on("disconnect", () => {
  //   console.log("A user disconnected");
  // });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
