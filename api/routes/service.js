const express = require("express");
const router = express.Router();
const multer =require('multer')
const upload = multer();
const{ addServiceToUser, getServicesForUser, freelancerApplyForJob, getUserNameOfService}=require("../controllers/service")

router.get("/getserviceUser/:userId",getServicesForUser)
router.get("/getUserNameOfService/:serviceId",getUserNameOfService)
router.post("/add/:userId",upload.single('image'),addServiceToUser)
router.post("/freelancerApplyForJob/:userId/:serviceId", freelancerApplyForJob)


module.exports = router;