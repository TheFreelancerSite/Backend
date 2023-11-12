// admin.controller.js

const db = require('../database/index');




async function authenticateAdmin(req, res) {
  const { email, password } = req.body;
  console.log("request", req.body)

  try {
    const admin = await db.admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(400).json({ error: "Admin doesn't exist" });
    }

    if (admin.password !== password) {

      return res.status(400).json({ error: "Email or password incorrect" });
    }

    return res.status(201).json(admin); // Authentication successful

  } catch (error) {
    console.error("Error authenticating admin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getUserById(req, res) {
  try {
    const { userId } = req.params
    const user = await db.User.find({
      where: {
        id: userId,
      }
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
}
async function getclients(req, res) {
  try {

    const client = await db.User.findAll({
      where: {
        isSeller: false,
      }
    })
    res.status(200).json(client)
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
}
async function getfreelancer(req, res) {
  try {

    const client = await db.User.findAll({
      where: {
        isSeller: true,
      }
    })
    res.status(200).json(client)
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
}



module.exports = {
  authenticateAdmin,
  getUserById,
  getclients,
  getfreelancer
};
