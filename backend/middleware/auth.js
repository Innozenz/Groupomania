const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = (req, res, next) => {
    // const accessToken = req.header.authorization("accessToken");

    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(accessToken, "importantsecret");
        const userId = decodedToken.userId;

        req.user = decodedToken;

        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch (err) {
        return res.json({error: err});
    }
};

module.exports = {validateToken};
