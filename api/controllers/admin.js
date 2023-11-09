// admin.controller.js

const db = require('../database/index');




async function authenticateAdmin(req, res) {
  const { email, password } = req.body;
  try {
    const admin = await db.admin.findOne({ where:{email} });

    if (!admin) {
      return res.status(400).json({ error: "Admin doesn't exist" });
    }

    if (admin.password !== password) {
      console.log("oyyyyyyyy",admin.password)
      console.log("wiiiiiiw",password)
      return res.status(400).json({ error: "Email or password incorrect" });
    }
    return res.status(201).json(admin); // Authentication successful

  } catch (error) {
    console.error("Error authenticating admin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}



module.exports = {
  authenticateAdmin,
};
