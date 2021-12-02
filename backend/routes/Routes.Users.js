const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/Controllers.Users");
const {validateToken} = require("../middleware/auth");

router.post("/", usersCtrl.createUser);

router.post("/login", usersCtrl.login);

router.get("/auth", validateToken, usersCtrl.authCheck);

module.exports = router;
