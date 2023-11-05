const { User } = require("../database/index");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jwt.helper");
const { uploadImageToCloudinary } = require("../helpers/cloudinaryHelper");
require("dotenv").config();
const { Readable } = require("stream");


module.exports = {
  createProfile: async (req, res) => {
    try {
      const checkemail = await User.findOne({
        where: { email: req.body.email },
      });

      if (checkemail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashpassword = await bcrypt.hash(req.body.password, 10);

      console.log(req.file);

      if (req.file && req.file.buffer) {
        const imageBuffer = req.file.buffer;
        const imageStream = Readable.from(imageBuffer);
       console.log(req.file.buffer);
        try {
          const cloudinaryResult = await uploadImageToCloudinary(imageStream);

          console.log(cloudinaryResult  );
          const newuser = await User.create({
            userName: req.body.userName,
            email: req.body.email,
            password: hashpassword,
            imgUrl: cloudinaryResult.secure_url,
            country: req.body.country,
            phone: req.body.phone,
            description: req.body.description,
            isSeller: req.body.isSeller,
          });
          res.status(201).json(newuser.email);
        } catch (error) {
          console.error("Error uploading image to Cloudinary:", error);
          res.status(500).json(error);
        }
      } else {
        const newuser = await User.create({
          userName: req.body.userName,
          email: req.body.email,
          password: hashpassword,
          country: req.body.country,
          phone: req.body.phone,
          description: req.body.description,
          isSeller: req.body.isSeller,
        });

        res.status(201).json(newuser.email);
      }
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
      const loginUser = await User.findOne({ where: { email } });
      if (!User) {
        return res.status(400).json({ error: "User Not Found." });
      }
      const passwordMatch = await bcrypt.compare(password, loginUser.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Password is incorrect." });
      }
      const token = generateToken(loginUser.id, loginUser.isSeller,loginUser.userName);
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
