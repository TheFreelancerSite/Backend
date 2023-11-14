const db = require("../database/index");
const cloudinary = require("../utils/cloudinary");
const { Readable } = require("stream");

module.exports = {
  getServicesForUser: async (req, res) => {
    const { userId } = req.params;
    const user = await db.User.findOne({ where: { id: userId } });

    if (user) {
      // Check if user is not null or undefined
      if (user.isSeller === true) {
        try {
          const clientServices = await db.service.findAll({
            where: {
              owner: "freelancer",
            },
          });
          return res.status(200).json(clientServices);
        } catch (error) {
          return res.status(500).json(error);
        }
      } else {
        try {
          const freelancerServices = await db.service.findAll({
            where: {
              owner: "client",
            },
          });
          return res.status(200).json(freelancerServices);
        } catch (error) {
          return res.status(500).json(error);
        }
      }
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  },

  getServicesForSpecificUser: async (req, res) => {
    const { userId } = req.params;
    const user = await db.User.findOne({ where: { id: userId } });
    // console.log("this is ",user.isSeller)
    //if the isSeller is true it means that the user is a freelancer

    if (user.isSeller === true) {
      try {
        const clientServices = await db.service.findAll({
          where: {
            owner: "client",
            userId: userId,
          },
        })
        // await requestedService =await db.request.find
          return res.status(200).json(clientServices)
      } 
      catch(error){
        // console.log(error)
        return res.status(500).json(error);
      }
    } else {
      try {
        const freelancerServices = await db.service.findAll({
          where: {
            owner: "freelancer",
            userId: userId,
          },
        });
        return res.status(200).json(freelancerServices);
      } catch (error) {
        // console.log(error)
        return res.status(500).json(error);
      }
    }
  },
  getUserNameOfService: async (req, res) => {
    try {
      const { serviceId } = req.params;

      const service = await db.service.findOne({
        where: {
          id: serviceId,
        },
      });

      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }

      const userId = service.userId;

      const user = await db.User.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getServiceById: async (req, res) => {
    try {
      const { serviceId } = req.params;
      const service = await db.service.findOne({
        where: {
          id: serviceId,
        },
      });
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addServiceToUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const {
        title,
        category,
        description,
        deliveryTime,
        job_img,
        feautures,
        price,
        owner,
      } = req.body;
      console.log("this is req.file  ", req.file);
      const user = await db.User.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const imageBuffer = req.file.buffer;
      const imageStream = Readable.from(imageBuffer);
      const cloudinaryResult = await cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
        },
        async (error, result) => {
          if (error) {
            console.error("errro uploading img", error);
            res.status(500).json({ error: "Image upload failed" });
          }
          console.log(cloudinaryResult);
          const service = await db.service.create({
            title,
            category,
            description,
            deliveryTime,
            feautures,
            price,
            userId,
            job_img: result.secure_url,
            owner,
          });

          res.status(201).json(service);
        }
      );
      console.log("this is the userid", userId);

      imageStream.pipe(cloudinaryResult);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  //once the freelancer clicks on apply for job this is the controller that will handel it
  userApplyForJob: async (req, res) => {
    const { userId, serviceId } = req.params;

    try {
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

  usersPending: async (req, res) => {
    const { serviceId } = req.params;
    try {
      const usersForSercice = await db.request.findAll({
        where: {
          serviceId: serviceId,
          user_service_status: "pending",
        },
      });
      res.status(200).json(usersForSercice);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  //once the client accept the request this controller will handel it
  AcceptApply: async (req, res) => {
    try {
      const { userId, serviceId } = req.params;
      const pendingToBeAccepted = await db.request.findAll({
        where: {
          userId,
          serviceId,
        },
      });

      if (pendingToBeAccepted.length > 0) {
        // Assuming 'user_service_status' is the name of the column in your model
        for (const request of pendingToBeAccepted) {
          await request.update({
            user_service_status: "accepted",
          });
        }

        return res
          .status(200)
          .json({ message: "Requests have been accepted." });
      } else {
        return res.status(404).json({ message: "No pending requests found." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  isServiceHaveAcceptedUser: async (req, res) => {
    const { serviceId } = req.params;
    try {
      const isAcctept = await db.request.findOne({
        where: {
          serviceId,
          user_service_status: "accepted",
        },
      });
      isAcctept ? res.json({ message: true }) : res.json({ message: false });
    } catch (error) {
      console.log(error);
    }
  },

  getTheAcceptedUser: async (req, res) => {
    const { serviceId } = req.params;
    try {
      const userAccepted = await db.request.findOne({
        where: {
          serviceId,
          user_service_status: "accepted",
        },
      });
      userAccepted
        ? res.status(200).json({ message: true, userAccept: userAccepted })
        : res.json({ message: false });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  //when the user clicks on valiate 
  updatingRequestWhenServiceFinish : async(req,res)=>{

    try {
      const {serviceId ,userId}=req.params
      const serviceOnRequest = await db.request.findOne({
        where: {
          serviceId,
          userId,
          user_service_status: "accepted",
        },
      });
    
      if (serviceOnRequest) {
        await serviceOnRequest.update({ isCompleted: true });
    
        res.status(200).json({ message: 'Request updated successfully' });
      } else {
        res.status(404).json({ message: 'Request not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  isUserCompleteJob :async(req,res)=>{
    const {userId,serviceId}=req.params
    try{
      const jobCompleted =await db.request.findOne({
        where :{
          userId,
          serviceId,
        }
      })
      jobCompleted.isCompleted ? res.json(true) :res.json(false)
    }catch(error){
      res.status(500).json(error)
      console.group(error)
    }
  },
  updateThestars :async(req,res)=>{
    const {serviceId} =req.params
    const {stars}=req.body
    try{
      const service =await db.service.findByPk(serviceId)
      if(service){
        await service.update({totalStars:stars})
        res.status(200).json({message :"update success"})
      }else{
        res.status(404).json({message :"service not found"})
      }
    }
    catch(error){
      res.status(500).json(error)
    }
  },

  giveReview :async(req,res)=>{
    const {serviceId}=req.params
    const {feedback} =req.body
    try{
      const service =await db.service.findByPk(serviceId)
      if(service){
        await service.update({serviceReviews:feedback})
        res.status(200).json({message :"update feedback success"})
      }else{
        res.status(404).json({message :"service not found"})
      }
    }catch(error){
      res.status(500).json(error)
    }
  }


}
