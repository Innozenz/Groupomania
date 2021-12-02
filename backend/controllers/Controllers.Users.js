const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {validateToken} = require("../middleware/auth");

require('dotenv').config();

exports.createUser = async (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        }).then(() => {
            res.json("User registered");
        }).catch((err) => {
            if (err) {
                res.status(400).json({error: err});
            }
        });
    });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) res.status(400).json({ error: "User Doesn't Exist" });

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
            res
                .status(400)
                .json({ error: "Wrong Username and Password Combination!" });
        } else {
            const accessToken = jwt.sign({
              username: user.username, id: user.id
            }, "importantsecret");
            res.json(accessToken);
        }
    });
};

exports.authCheck = (req, res) => {
    res.json(req.user);
}
