const express = require("express");
const router = express.Router();
const likesCtrl = require("../controllers/Controllers.Likes");
const {validateToken} = require("../middleware/auth");
const usersCtrl = require("../controllers/Controllers.Users");

router.post("/", validateToken, likesCtrl.like);

router.get("/authCheck", validateToken, usersCtrl.authCheck);



module.exports = router;
