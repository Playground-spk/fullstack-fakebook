const db = require("../models");

const createPost = async (req, res) => {
  let { text, picture } = req.body;
  let idOwner = req.user.id;

  let post = await db.post.create({ text, picture, user_id: idOwner });

  res.status(201).send(post);
};

const editPost = async (req, res) => {
  let ownerPost = req.user.id;
  let targetId = req.params.id;
  let { text, picture } = req.body;

  let post = await Post.findOne({
    where: { user_id: ownerPost, post_id: targetId },
  });

  await post.update({ text, picture });
};

const deletePost = async (req, res) => {
  let ownerPost = req.user.id;
  let targetId = req.params.id;

  db.post.destroy({ where: { user_id: ownerPost, post_id: targetId } });
};

module.exports = { createPost, editPost };
