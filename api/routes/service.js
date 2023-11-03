const express = require("express");
const router = express.Router();

const{ addServiceToUser, getServicesForUser, freelancerApplyForJob}=require("../controllers/service")

router.get("/getserviceUser/:userId",getServicesForUser)
router.post("/add/:userId",addServiceToUser)
router.post("/freelancerApplyForJob/:userId/:serviceId", freelancerApplyForJob)


module.exports = router;