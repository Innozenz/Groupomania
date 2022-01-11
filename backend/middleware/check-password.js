const passwordSchema = require('../passwordCheck/Models.Password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({message: "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"});
    } else {
        next();
    }
};
