// admin.controller.js
const bcrypt = require('bcrypt');
const Admin = require('../models/admin.model');



async function authenticateAdmin(email, password) {
  const admin = await Admin.findOne({ where: { email } });
  if (!admin) {
    return null; // Admin not found
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    return null; // Invalid password
  }

  return admin; // Authentication successful
}


module.exports = {
  authenticateAdmin,
};
