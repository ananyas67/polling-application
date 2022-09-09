const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  if (request.headers['authorization']) {
    const token = request.headers['authorization'].split(' ')[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
     next(Error('Failed to authenticate token'));
      } else {
        request.decoded = decoded;
        next();
      }
    });
  } else {
   next(Error('No token provided'));
  }
};