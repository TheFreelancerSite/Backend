// admin.controller.js

const {User, admin, service}= require('../database/index');
const { where } = require('sequelize');
const { generateTokenForAdmin } = require('../helpers/jwt.helper')
const { Op } = require("sequelize");



async function authenticateAdmin(req, res) {
  const { email, password } = req.body;
  console.log("request", req.body);

  try {
    const admins = await admin.findOne({ where: { email } });

    if (!admins) {
      return res.status(400).json({ error: "Admin doesn't exist" });
    }

    if (admins.password !== password) {
      return res.status(400).json({ error: "Email or password incorrect" });
    }
    const token = generateTokenForAdmin(
      admins.id,
      admins.role,
      admins.email,
      admins.imgUrl
    );
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const payload = JSON.parse(atob(base64));
    console.log(payload)
    res.status(200).json({ admins, payload, token, message: "succeeded" });

  } catch (error) {
    console.error("Error authenticating admin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
async function getUserById(req, res) {
  try {
    const { userId } = req.params
    const user = await User.findOne({
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
    const client = await User.findAll({
      where: {
        isSeller: false,
      }
    })
    res.status(200).json(client)
    console.log(client)
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
}
async function getfreelancer(req, res) {
  try {

    const client = await User.findAll({
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
async function deleteUser(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required in the request body' });
    }

    const user = await User.findOne({ where: { id: userId } });

    if (user) {
      await user.destroy();
      res.status(200).json({ userId });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.error(error);
  }
}
async function getAdmin(req, res) {
  try {
    const { adminId } = req.params;
    if (!adminId) {
      return res.status(400).json({ error: 'admin not found' });
    }

    // Replace the following line with your actual code to fetch admin data by ID from the database
    const admin = await admin.findOne({ where: { id: adminId } });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}

async function updateAdmin(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await admin.findOne({ where: { role: "admin" } });
    let newPassword = null;

    if (password && !email) {
      newPassword = bcryptjs.hashSync(password, 10);
    }

    if (newPassword || email || (req.file && req.file.buffer)) {
      if (req.file && req.file.buffer) {
        const imageBuffer = req.file.buffer;
        const imageStream = Readable.from(imageBuffer);

        try {
          const cloudinaryResult = await uploadImageToCloudinary(imageStream);

          // Update only if there are changes
          const updateFields = {
            email,
            password: newPassword,
            imgUrl: cloudinaryResult.secure_url,
          };

          await admin.update(updateFields);

          res.status(200).json({ message: "success" });
        } catch (error) {
          console.error("Error uploading image to Cloudinary:", error);
          res.status(500).json(error);
        }
      } else {
        // Update only if there are changes
        const updateFields = {
          email,
          password: newPassword,
        };

        await admin.update(updateFields);
        res.status(200).json({ message: "success" });
      }
    } else {
      res.status(200).json({ message: "No updates needed" });
    }
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ error: err });
  }
}
async function logoutAdmin(req, res) {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Add the token to a blacklist or perform any other token invalidation mechanism
    // This could involve storing the invalidated token in a database or cache
    // In this example, I'm using a simple in-memory set to store invalidated tokens
    invalidatedTokens.add(token);

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Set to store invalidated tokens (in-memory, replace with a persistent store in production)
const invalidatedTokens = new Set();
async function search(req, res) {
  let search = req.body.search;
  let regex = `%${search}%`; // SQL pattern for case-insensitive search

  try {
    let query = {
      where: {
        [Op.or]: [
          { userName: { [Op.like]: regex } },
          { country: { [Op.like]: regex } },
          { phone: { [Op.like]: regex } },
        ],
      }
    };

    const users = await User.findAll(query);
    if (users.length > 0) {
      res.status(200).json({ status: true, data: users });
    } else {
      res.status(201).json({ status: false, message: 'No user found' });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};




module.exports = {
  authenticateAdmin,
  getUserById,
  getclients,
  getfreelancer,
  deleteUser,
  getAdmin,
  updateAdmin,
  logoutAdmin,
  search,
  
  
};
