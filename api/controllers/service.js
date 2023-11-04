const db = require('../database/index');
const cloudinary =require ("../utils/cloudinary")
const {Readable}=require('stream')

module.exports = {
  getServicesForUser :async(req,res)=>{
    const {userId}=req.params
    const user= await db.User.findOne({where :{id : userId}});
    // console.log("this is ",user.isSeller)
    //if the isSeller is true it means that the user is a freelancer

    if(user.isSeller===true){
      try{
        const clientServices = await db.service.findAll({
          where:{
            owner:"freelancer" ,
          },
        })
        return res.status(200).json({clientServices})
      } 
      catch(error){
        // console.log(error)
        return res.status(500).json(error)
      }
  
    }else {
      try{
        const freelancerServices = await db.service.findAll({
          where:{
            owner:"client" ,
          },
        })
        return res.status(200).json(freelancerServices)
      } 
      catch(error){
        // console.log(error)
        return res.status(500).json(error)
      }
    }
  },
  getUserNameOfService: async (req, res) => {
    try {
      const { serviceId } = req.params;
  
      // Find a single service by ID
      const service = await db.service.findOne({
        where: {
          id: serviceId
        }
      });
  
      // Check if the service was found
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
  
      // Get the userId from the service
      const userId = service.userId;
  
      // Find the user using the userId
      const user = await db.User.findOne({
        where: {
          id: userId
        }
      });
  
      // Check if the user was found
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Send the user's data in the response
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  
  addServiceToUser: async (req, res) => {
    try {
    const { userId } = req.params;
    const { title, category, description, deliveryTime,job_img, features1, features2, price,owner } = req.body;
    console.log("this is req.file  ",req.file)
    const user = await db.User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const imageBuffer =req.file.buffer;
    const imageStream=Readable.from(imageBuffer)
    const cloudinaryResult =await cloudinary.uploader.upload_stream({
      resource_type:'image'
    },
    async (error,result)=>{
      if(error){
        console.error("errro uploading img",error)
        res.status(500).json({error :"Image upload failed"})
      }
      console.log(cloudinaryResult)
      const service = await db.service.create({
        title,
        category,
        description,
        deliveryTime,
        features1,
        features2,
        price,
        userId,
        job_img:result.secure_url,
        owner
      });
      
      res.status(201).json(service);
    }
    )
    console.log("this is the userid",userId)

   imageStream.pipe(cloudinaryResult)


    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  //once the freelancer clicks on apply for job this is the controller that will handel it 
  freelancerApplyForJob : async (req,res)=>{
    const {userId,serviceId}=req.params
    console.log("thiiiiiiiiiiiiiiiiiiiiiis is the serviceid ",serviceId)
    try{
      const userForService =await db.request.create({
        user_service_status:"pending",
        isCompleted:"false",
        serviceId: serviceId,
        userId:userId
      })
      res.status(201).json("user is Pending")
    }catch(error){
      res.json(error)
      console.log(error)
    }
  },
  //once the client accept the request this controller will handel it 
  AcceptApply :async(req,res)=>{
    
  }







};
