const express = require("express");
const router = express.Router();

const{ addServiceToUser, getServicesForUser}=require("../controllers/service")

router.get("/getserviceUser/:userId",getServicesForUser)
router.post("/add/:userId",addServiceToUser)


module.exports = router;