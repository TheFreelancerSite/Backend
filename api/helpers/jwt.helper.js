const jwt = require("jsonwebtoken");
const { atob } = require('atob');
require('dotenv').config();






exports.getTokenFromHeader = (req) => {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
  
    return authHeader.split(' ')[1];
  }
  
  
  exports.decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }
  
  
  
  exports.verifyToken = (token, res, next) => {
    jwt.verify(token, process.env.jwt_Secret, (err) => {
      if (err) {
        console.log(err);
        return sendErrorResponse(res, 401, err);
      }
      next();
    })
}