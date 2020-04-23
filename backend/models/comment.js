module.exports = (sequelize, dataType) => {
  const comment = sequelize.define("comment", {
    message: {
      type: dataType.STRING,
    },
  });
  comment.associate = (models) => {
    comment.belongsTo(models.user, { foreignKey: "user_id" });
    comment.belongsTo(models.post, { foreignKey: "post_id" });
  };
  return comment;
};
