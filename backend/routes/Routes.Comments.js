const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/Controllers.Comments");
const {validateToken} = require("../middleware/auth");

router.get("/:postId", validateToken, commentsCtrl.getComments);

router.post("/", validateToken, commentsCtrl.createComment);

router.delete("/:commentId", validateToken, commentsCtrl.deleteComment);


module.exports = router;
