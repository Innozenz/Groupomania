const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/Controllers.Users");
const {validateToken} = require("../middleware/auth");

router.post("/", usersCtrl.createUser);

router.post("/login", usersCtrl.login);

router.get("/authCheck", validateToken, usersCtrl.authCheck);

router.get("/userinfo/:id", validateToken, usersCtrl.userInfo);

router.put("/editUser", validateToken, usersCtrl.editUser);

module.exports = router;
