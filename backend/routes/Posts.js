const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/Posts");

router.get("/", postsCtrl.getAllPosts);

router.get("/byId/:id", postsCtrl.getPostById);

router.post("/", postsCtrl.createPost);


module.exports = router;
