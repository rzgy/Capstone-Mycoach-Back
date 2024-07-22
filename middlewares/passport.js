// middlewares/passport.js
const Coach = require("../models/Coach");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const JwtStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
require("dotenv").config();

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, next) => {
    try {
      const coach = await Coach.findOne({ email: email });

      if (!coach) {
        return next({ msg: "Username or password is wrong!" });
      }

      const checkPassword = await bcrypt.compare(password, coach.password);
      if (checkPassword == false) {
        return next({ msg: "email or password is wrong!" });
      }
      next(false, coach); //req.user
    } catch (error) {
      next(error);
    }
  }
);

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, next) => {
    // here you check if token is exp

    const coach = await Coach.findById(payload._id);

    if (!coach) {
      return next({ msg: "Coach not found!" });
    }

    next(false, coach); // req.coach
  }
);

module.exports = { localStrategy, jwtStrategy };
