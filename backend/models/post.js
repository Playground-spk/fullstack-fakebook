module.exports = (sequelize, dataType) => {
  const post = sequelize.define("post", {
    text: {
      type: dataType.STRING,
    },
    picture: {
      type: dataType.STRING,
    },
  });
  post.associate = (models) => {
    post.belongsTo(models.user, { foreignKey: "user_id" });
    post.hasMany(models.comment, { foreignKey: "post_id" });
  };
  return post;
};
