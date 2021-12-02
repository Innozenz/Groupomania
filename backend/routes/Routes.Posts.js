const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/Controllers.Posts");
const {validateToken} = require("../middleware/auth");

router.get("/", postsCtrl.getAllPosts);

router.get("/byId/:id", postsCtrl.getPostById);

router.post("/", validateToken, postsCtrl.createPost);


module.exports = router;
