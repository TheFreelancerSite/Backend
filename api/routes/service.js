const express = require("express");
const serviceController = require("../controllers/service");
const router = express.Router();
const multer = require('multer')
const upload = multer();
const { addServiceToUser, getServicesForUser, getUserNameOfService, getServiceById, userApplyForJob, searchForServices } = require("../controllers/service")

router.get("/getserviceUser/:userId", getServicesForUser)
router.get("/getUserNameOfService/:serviceId", getUserNameOfService)
router.get("/getServiceById/:serviceId", getServiceById)
router.post("/add/:userId", upload.single('image'), addServiceToUser)
router.post("/userApplyForJob/:userId/:serviceId", userApplyForJob)
router.post("/searchForServices/:userId", searchForServices)


module.exports = router;