const {Users} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config();

exports.createUser = async (req, res) => {
    const {email, username, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            email: email,
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
    const {email, password} = req.body;

    const user = await Users.findOne({where: {email: email}});

    if (!user) res.status(400).json({error: "User Doesn't Exist"});

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
            res
                .status(400)
                .json({error: "Wrong Username and Password Combination!"});
        } else {
            res.status(200).json({
                userId: user.id,
                email: email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                job: user.job,
                isAdmin: user.isAdmin,
                image: user.image,
                token: jwt.sign(
                    {userId: user.id, email: email, username: user.username, firstName: user.firstName, lastName: user.lastName, job: user.job, isAdmin: user.isAdmin, image: user.image},
                    process.env.SECRET_TOKEN,
                    {expiresIn: "30m"})
            })
        }
    });
};

exports.authCheck = (req, res) => {
    res.json(req.user);
}

exports.userInfo = async (req, res) => {
    const id = req.params.id;

    const info = await Users.findOne({where: {id: id}} );

    res.json(info);
}

exports.allUserInfo = async (req, res) => {

    const info = await Users.findAll();

    res.json(info);
}

exports.editUser = async (req, res) => {
    const {newFirstName, newLastName, newJob} = req.body;


    if (newFirstName) {
        await Users.update({firstName: newFirstName}, {where: {username: req.user.username}});
    }
    if (newLastName) {
        Users.update({lastName: newLastName}, {where: {username: req.user.username}});
    }

    if (newJob) {
        Users.update({job: newJob}, {where: {username: req.user.username}});
    }
    if(req.file && req.file.path) {
        let image = req.file.path
        if (image) {
            Users.update({image: image}, {where: {username: req.user.username}});
        }
    }


    res.json("success");
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    Users.destroy({where: {id: id}});

    res.json("Account deleted !");
}
