const { where } = require('sequelize');
const db = require('../database/index');
const cloudinary = require("../utils/cloudinary")
const { Readable } = require('stream')
const { Op } = require('sequelize');

module.exports = {

  getServicesForUser: async (req, res) => {
    const { userId } = req.params
    const user = await db.User.findOne({ where: { id: userId } });
    // console.log("this is ",user.isSeller)
    //if the isSeller is true it means that the user is a freelancer

    if (user.isSeller === true) {
      try {
        const clientServices = await db.service.findAll({
          where: {
            owner: "freelancer",
          },
        })
        return res.status(200).json(clientServices)
      }
      catch (error) {
        // console.log(error)
        return res.status(500).json(error)
      }

    } else {
      try {
        const freelancerServices = await db.service.findAll({
          where: {
            owner: "client",
          },
        })
        return res.status(200).json(freelancerServices)
      }
      catch (error) {
        // console.log(error)
        return res.status(500).json(error)
      }
    }
  },
  getUserNameOfService: async (req, res) => {
    try {
      const { serviceId } = req.params;

      const service = await db.service.findOne({
        where: {
          id: serviceId
        }
      });

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      const userId = service.userId;

      const user = await db.User.findOne({
        where: {
          id: userId
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getServiceById: async (req, res) => {
    try {
      const { serviceId } = req.params
      const service = await db.service.findOne({
        where: {
          id: serviceId
        }
      })
      res.status(200).json(service)
    } catch (error) {
      res.status(500).json(error)
    }

  },

  addServiceToUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const { title, category, description, deliveryTime, job_img, features1, features2, price, owner } = req.body;
      console.log("this is req.file  ", req.file)
      const user = await db.User.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const imageBuffer = req.file.buffer;
      const imageStream = Readable.from(imageBuffer)
      const cloudinaryResult = await cloudinary.uploader.upload_stream({
        resource_type: 'image'
      },
        async (error, result) => {
          if (error) {
            console.error("errro uploading img", error)
            res.status(500).json({ error: "Image upload failed" })
          }
          console.log(cloudinaryResult)
          const service = await db.service.create({
            title,
            category,
            description,
            deliveryTime,
            features,
            price,
            userId,
            job_img: result.secure_url,
            owner
          });

          res.status(201).json(service);
        }
      )
      console.log("this is the userid", userId)

      imageStream.pipe(cloudinaryResult)


    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  //once the freelancer clicks on apply for job this is the controller that will handel it 
  userApplyForJob: async (req, res) => {

    try {
      const { userId } = req.params;
      const user = await db.User.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json("User not found");
      }

      let requester = user.isSeller ? "client" : "freelancer";

      const userForService = await db.request.create({
        user_service_status: "pending",
        isCompleted: false, // Removed quotes to represent a boolean value
        serviceId: serviceId,
        userId: userId,
        requester: requester,
      });

      res.status(201).json("User is Pending");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json("An error occurred while processing the request.");
    }
  },
  searchForServices: async (req, res) => {
    const search = req.body.search;
    const { userId } = req.params;
    try {
      const user = await db.User.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      let query = {
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { category: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
            { deliveryTime: { [Op.like]: `%${search}%` } },
            { price: { [Op.like]: `%${search}%` } },
          ],
        },
      };

      if (user.isSeller) {
        query.where.owner = "freelancer";
      } else {
        query.where.owner = "client";
      }
      const services = await db.service.findAll(query);
      res.status(200).json(services);
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  }


}










