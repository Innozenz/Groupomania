const { Comments, Likes, Users} = require("../models");

exports.createComment = async (req, res) => {
    const comment = req.body
    const UserId = req.user.userId;
    comment.UserId = UserId;
    await Comments.create(comment);
    res.json(comment);
}

exports.getComments = async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({where: {PostId: postId}, include: [Users]});
    res.json(comments);
}

exports.deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    await Comments.destroy({where: {
        id: commentId,
        },
    });

    res.json("Deleted successfully");
}
