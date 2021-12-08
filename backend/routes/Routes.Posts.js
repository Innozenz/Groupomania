const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/Controllers.Posts");
const {validateToken} = require("../middleware/auth");
const usersCtrl = require("../controllers/Controllers.Users");

router.get("/", validateToken, postsCtrl.getAllPosts);

router.get("/byId/:id", validateToken, postsCtrl.getPostById);

router.post("/", validateToken, postsCtrl.createPost);

router.get("/authCheck", validateToken, usersCtrl.authCheck);


module.exports = router;
