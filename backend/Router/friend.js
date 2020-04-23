const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  requestFriend,
  acceptsFriend,
  deleteStatus,
} = require("../controller/friend");

const auth0 = passport.authenticate("jwt", { session: false });

//create

router.post("/request/:id", auth0, requestFriend);

//read

//update
router.put("/request/:id", auth0, acceptsFriend);

//delete

router.delete("/:id", auth0, deleteStatus);

module.exports = router;
