const db = require("../models/");
const { Op } = require("sequelize");

const requestFriend = async (req, res) => {
  let fromId = req.user.id;
  let toId = req.params.id;

  let status = await db.friend.findOne({
    where: {
      [Op.or]: [
        { request_to: toId, request_from: fromId },
        { request_to: fromId, request_from: toId },
      ],
    },
  });

  if (status || fromId == toId) {
    res.status(400).send({ message: " u can not send  this request " });
  } else {
    await db.friend.create({
      status: "pending",
      request_to: toId,
      request_from: fromId,
    });
    res.status(201).send({
      message: `user id:${fromId} is already send request to id:${toId} `,
    });
  }
};

const acceptsFriend = async (req, res) => {
  let firstPerson = req.user.id;
  let secondPerson = req.params.id;

  let status = await db.friend.findOne({
    where: {
      request_to: firstPerson,
      request_from: secondPerson,
      status: "pending",
    },
  });
  if (status) {
    await status.update({ status: "friend" });
    res.status(202).send({ message: " your status updated successfully" });
  } else {
    res.status(400).send({ message: "u cannot update your status" });
  }
};

const deleteStatus = async (req, res) => {
  let firstPerson = req.user.id;
  let secondPerson = req.params.id;

  let relation = await db.friend.findOne({
    where: {
      [Op.or]: [
        { request_from: firstPerson, request_to: secondPerson },
        { request_from: secondPerson, request_to: firstPerson },
      ],
    },
  });

  if (relation.status == "pending") {
    await relation.destroy();
    res.status(403).send({ message: "deny pending completed" });
  } else if (relation.status == "friend") {
    await relation.destroy();
    res.status(403).send({ message: "friend is already removed" });
  } else if (
    relation.status == "banded" &&
    relation.request_to == firstPerson
  ) {
    await relation.destroy();
    res.status(403).send({ message: " u already unblock  this person" });
  } else {
    res.status(400).send({ message: "your request is wrong" });
  }
};

module.exports = { requestFriend, acceptsFriend, deleteStatus };
