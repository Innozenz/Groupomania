const { Comments } = require("../models");

exports.createComment = async (req, res) => {
    const comment = req.body;
    await Comments.create(comment);
    res.json(comment);
}

exports.getCommentsById = async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.json(comments);
}
