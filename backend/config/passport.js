const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../models");

let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.secretOrKey,
};

passport.use(
  "jwt",
  new JwtStrategy(options, async (payload, done) => {
    const user = await db.user.findOne({ where: { id: payload.id } });

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
);
