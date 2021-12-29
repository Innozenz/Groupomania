require('dotenv').config();
const jwt = require('jsonwebtoken');


const validateToken = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(accessToken, process.env.SECRET_TOKEN);
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
