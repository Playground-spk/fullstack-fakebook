const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const Register = async (req, res) => {
  const { username, password, name } = req.body;

  const user = await db.user.findOne({ where: { username } });
  if (user) {
    res.status(400).send({ message: "this username is already taken" });
  } else {
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));

    const hashedPassword = bcrypt.hashSync(password, salt);
    await db.user.create({
      username,
      password: hashedPassword,
      name,
    });
    res.status(201).send({ message: "user created successfully" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await db.user.findOne({ where: { username } });

  let getCheckPassword = (user) => {
    if (user) return user.password;
    else return process.env.FAKED_PASSWORD;
  };

  let successfully = bcrypt.compareSync(password, getCheckPassword(user));

  if (!user || !successfully) {
    res.status(401).send({ message: "user or password is wrong" });
  } else {
    const payload = {
      id: user.id,
      name: user.name,
      profilePicture: user.profilePicture,
    };

    const token = jwt.sign(payload, process.env.secretOrKey, {
      expiresIn: "1h",
    });

    res.status(200).send(token);
  }
};
const getProfile = async (req, res) => {
  let userInterface = req.user.id;
  let targetUser = req.params.id;
  let targetProfile = await db.friend.findOne({
    where: {
      [Op.or]: [
        { request_from: userInterface, request_to: targetUser },
        {
          request_from: targetUser,
          request_to: userInterface,
        },
      ],
    },
    include: [db.post],
  });
};

module.exports = { Register, login, getProfile };
