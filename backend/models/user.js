module.exports = (sequelize, dataType) => {
  const user = sequelize.define("user", {
    name: {
      type: dataType.STRING,
    },
    username: {
      type: dataType.STRING,
    },
    password: {
      type: dataType.STRING,
    },
    profilePicture: {
      type: dataType.STRING,
    },
  });

  user.associate = (models) => {
    user.hasMany(models.post, { foreignKey: "user_id" });
    user.hasMany(models.comment, { foreignKey: "user_id" });
    user.belongsToMany(models.user, {
      through: models.friend,
      as: "request_to",
      foreignKey: "request_to",
    });
    user.belongsToMany(models.user, {
      through: models.friend,
      as: "request_from",
      foreignKey: "request_from",
    });
  };
  return user;
};
