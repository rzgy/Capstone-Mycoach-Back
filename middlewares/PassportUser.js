// middlewares/passport.js
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const JwtStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
require("dotenv").config();

const localStrategyUser = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (username, password, next) => {
    try {
      const user = await User.findOne({ email: username });

      if (!user) {
        return next({ msg: "Username or password is wrong!" });
      }

      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword == false) {
        return next({ msg: "Username or password is wrong!" });
      }
      next(false, user); //req.user
    } catch (error) {
      next(error);
    }
  }
);

const jwtStrategyUser = new JwtStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, next) => {
    // here you check if token is exp

    const user = await User.findById(payload._id);

    if (!user) {
      return next({ msg: "User not found!" });
    }

    next(false, user); // req.user
  }
);

module.exports = { localStrategyUser, jwtStrategyUser };
