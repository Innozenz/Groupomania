const { Posts } = require("../models");

exports.createPost = async (req, res) => {
    const post = req.body;
    const username = req.user.username;
    post.username = username;
    await Posts.create(post);
    res.json(post);
}

exports.getAllPosts = async (req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
}

exports.getPostById = async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
}
