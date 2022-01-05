const {Likes, Posts, Users} = require("../models");


exports.createPost = async (req, res) => {
    const post = req.body;
    const UserId = req.user.userId;
    console.log(req.user);
    post.UserId = UserId;
    if(req.file && req.file.path) post.image = req.file.path;
    await Posts.create(post);
    res.json(post);
}

exports.getAllPosts = async (req, res) => {
    const listOfPosts = await Posts.findAll({include: [Likes, Users]});
    const likedPosts = await Likes.findAll({where: {UserId: req.user.userId}});
    res.json({listOfPosts: listOfPosts, likedPosts: likedPosts});
}

exports.getPostById = async (req, res) => {
    const id = req.params.id;
    const postObject = await Posts.findOne({where: {id: id}, include: [Users]});
    res.json([postObject]);
}

exports.editPost = async (req, res) => {
    const {newText, id} = req.body;
    await Posts.update({content: newText}, {where: {id: id}});
    res.json(newText);
}

exports.deletePost = async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
        where: {
            id: postId,
        },
    });

    res.json("Deleted successfully");
}
