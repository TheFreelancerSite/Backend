const db = require('../database/index');

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
            owner:"client" ,
          },
        })
        return res.status(200).json(clientServices)
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
  addServiceToUser: async (req, res) => {
    const { userId } = req.params;
    const { title, category, description, deliveryTime, features1, features2, price } = req.body;
    console.log("this is the userid",userId)
    const user = await db.User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    try {
      const service = await db.service.create({
        title,
        category,
        description,
        deliveryTime,
        features1,
        features2,
        price,
        userId
      });
      
      res.status(201).json(service);
    } catch (error) {
      console.log(error);
      res.status(500).send('An error occurred');
    }
  },
  


};
