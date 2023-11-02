const { user } = require("../database/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  createProfile: async (req, res) => {
    try {
      const checkemail = await user.findOne({
        where: { email: req.body.email },
      });

      if (checkemail) {
        return res.status(400).json({ error: "Email already exists" });
      }
      const hashpassword = await bcrypt.hash(req.body.password, 10);

      const newuser = await user.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashpassword,
        imgUrl: req.body.imgUrl,
        country: req.body.country,
        phone: req.body.phone,
        description: req.body.description,
        isSeller: req.body.isSeller,
      });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  signin: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email && !password) {
        return res.status(400).json({ error: "Email or Password not found." });
      }
      const loginUser = await user.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: "User Not Found." });
      }
      const passwordMatch = await bcrypt.compare(password, loginUser.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Password is incorrect." });
      }
      const token = jwt.sign(
        {
          userId: user.id,
          isSeller: user.isSeller,
        },
        process.env.jwt_Secret,
        {
          expiresIn: "1d",
        }
      );
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const payload = JSON.parse(atob(base64));
      res.status(200).json({ payload, token, message: "succeeded" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
