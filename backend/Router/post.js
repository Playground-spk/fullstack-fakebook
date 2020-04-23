const express = require("express");
const router = express.Router();
const passport = require("passport");

const { createPost } = require("../controller/post");
const auth0 = passport.authenticate("jwt", { session: false });

//create

router.post("/", auth0, createPost);

//read

//update

//delete

module.exports = router;
