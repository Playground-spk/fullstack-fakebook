const express = require("express");
const router = express.Router();
const { Register, login, getProfile } = require("../controller/user");
const passport = require("passport");

const auth0 = passport.authenticate("jwt", { session: false });

//create

router.post("/register", Register);

router.post("/login", login);

//read

router.get("profile", auth0, getProfile);

//update

//delete

module.exports = router;
