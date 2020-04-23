module.exports = (sequelize, dataType) => {
  const friend = sequelize.define("friend", {
    status: {
      type: dataType.ENUM("pending", "friend", "banned"),
    },
  });
  return friend;
};
