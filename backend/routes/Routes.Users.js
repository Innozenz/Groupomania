const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/Controllers.Users");
const {validateToken} = require("../middleware/auth");
const checkPassword = require("../middleware/check-password");
const checkMail = require("../middleware/check-mail");
const multer = require("../middleware/multer");

router.post("/", checkPassword, checkMail, usersCtrl.createUser);

router.post("/login", usersCtrl.login);

router.get("/authCheck", validateToken, usersCtrl.authCheck);

router.get("/userinfo/:id", validateToken, usersCtrl.userInfo);

router.get("/userinfo", validateToken, usersCtrl.allUserInfo);

router.put("/editUser", validateToken, multer, usersCtrl.editUser);

router.delete("/deleteUser/:id", validateToken, usersCtrl.deleteUser);

module.exports = router;
