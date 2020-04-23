require("dotenv").config();
require("./config/passport");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");

const userRoute = require("./Router/user");
const friendRoute = require("./Router/friend");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", userRoute);

app.use("/friend", friendRoute);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`sever is running on Port` + process.env.PORT);
  });
});
