const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/Comments");

router.get("/:postId", commentsCtrl.getCommentsById);

router.post("/", commentsCtrl.createComment);


module.exports = router;
