const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/Controllers.Comments");
const {validateToken} = require("../middleware/auth");

router.get("/:postId", commentsCtrl.getComments);

router.post("/", validateToken, commentsCtrl.createComment);


module.exports = router;
