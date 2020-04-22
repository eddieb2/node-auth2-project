const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets');

module.exports = (req, res, next) => {
  // tokens are normally sent as the Authorization header
  const token = req.headers.authorization;
  const secret = secrets.jwtSecret;

  if (token) {
    // verify that token is valid
    jwt.verify(token, secret, (error, decodedToken) => {
      // if everything is good with the token, the error will be undefined
      if (error) {
        res.status(401).json({ message: 'You cannot pass!' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'Please provide credentials.' });
  }
};
