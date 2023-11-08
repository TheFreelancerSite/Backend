// admin.controller.js
const bcrypt = require('bcrypt');
const db = require('../database/index');




async function authenticateAdmin(email, password) {
  const admin = await db.admin.findOne({ where: { email ,} });
  if (!admin) {
    return null; // Admin not found
  }

  if (admin.password !== password) {
    return null; // Invalid password
  }

  return admin; // Authentication successful
}


module.exports = {
  authenticateAdmin,
};
