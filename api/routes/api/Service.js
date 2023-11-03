const express = require("express");
const router = express.Router();

const{ addServiceToUser}=require("../controllers/service")


router.post("/add/:userId",addServiceToUser)

module.exports = router;