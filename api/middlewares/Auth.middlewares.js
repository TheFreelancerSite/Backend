const {getTokenFromHeader , decodeToken , verifyToken} = require('../helpers/jwt.helper')
require('dotenv').config();


module.exports.freelancerAuthenticated = (req, res, next) => {
  const token = getTokenFromHeader(req);
    // console.log(token)
  if (!token) {
    return res.status(401).send('Access denied')
  }

  const payload = decodeToken(token);

  if (payload.isSeller) {
    return res.status(403).send('Access denied')
  }

  verifyToken(token, res, next);
};


module.exports.clientAuthenticated = (req, res, next) => {
  const token = getTokenFromHeader(req);
//   console.log(token)
  if (!token) {
    return res.status(401).send('Access denied')
  }

  const payload = decodeToken(token);

  if (!payload.isSeller) {
    return res.status(403).send('Access denied')
  }

  verifyToken(token, res, next);
};
module.exports.adminAuthenticated = (req, res, next) => {
  if (!token) {
    return res.status(401).send('Access denied')
  }
  const admin = decodeToken(token);
  if (!admin) {
    return res.status(403).send('Access denied')
  }
};



