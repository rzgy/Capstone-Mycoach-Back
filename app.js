const express = require("express");
const morgan = require("morgan");
const connectDB = require("./dataBase");
const app = express();
const errorHandler = require("./middlewares/errHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const coachRouter = require("./api/coach/routes");

const cors = require("cors");
const path = require("path");
require("dotenv").config();

app.use(morgan("dev"));

app.use(cors());

connectDB();

app.use(express.json());

app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);
app.use("/media", express.static(path.join(__dirname, "media")));

app.use("/coaches", coachRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
