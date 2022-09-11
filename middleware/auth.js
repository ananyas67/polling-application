const jwt = require('jsonwebtoken'); 

module.exports = (req, res, next) => {
    if (req.headers['authorization']) {
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, "SECRET", (err, decoded) => {
            if (err) {

                next(Error('Failed to authenticate token'));
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        next(Error('No token provided'));
    }
};

//`${process.env.JWT_SECRET_KEY}`