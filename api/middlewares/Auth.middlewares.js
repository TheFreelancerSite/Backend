const {getTokenFromHeader , decodeToken , verifyToken} = require('../helpers/jwt.helper')
require('dotenv').config();
const { authenticateAdmin } = require('../controllers/admin');


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
// module.exports.adminAuthenticated = async (req, res, next) => {
//   const { email, password } = req.body;

//   // Check if the email and password are provided
//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required' });
//   }

//   const admin = await authenticateAdmin(email, password);

//   if (!admin) {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }

//   // If authentication is successful, you can store user information in the request for later use.
//   req.admin = admin;

//   // Continue to the next middleware or route handler
//   next();
// };



