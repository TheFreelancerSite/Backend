const jwt = require("jsonwebtoken");
const { atob } = require('atob');
require('dotenv').config();



exports.generateToken = (userId, isSeller,userName) => {
  const token = jwt.sign(
    {
      userId,
      isSeller,
      userName
    },
    process.env.jwt_Secret,
    {
      expiresIn: '1d',
    }
  );
  return token;
}


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
        return res(401).send(err)
      }
      next();
    })
}