const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/Controllers.Posts");
const {validateToken} = require("../middleware/auth");
const usersCtrl = require("../controllers/Controllers.Users");
const multer = require("../middleware/multer");

router.get("/", validateToken, postsCtrl.getAllPosts);

router.get("/byId/:id", validateToken, postsCtrl.getPostById);

router.post("/", validateToken, multer, postsCtrl.createPost);

router.delete("/:postId", validateToken, postsCtrl.deletePost);

router.get("/authCheck", validateToken, usersCtrl.authCheck);

router.put("/postText", validateToken, postsCtrl.editPost);


module.exports = router;
