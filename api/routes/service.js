const express = require("express");
const serviceController = require("../controllers/service");
const router = express.Router();
const multer = require('multer')
const upload = multer();
const { addServiceToUser, getServicesForUser, getUserNameOfService, getServiceById, userApplyForJob, searchForServices } = require("../controllers/service")

router.get("/getserviceUser/:userId",getServicesForUser)
router.get("/getUserNameOfService/:serviceId",getUserNameOfService)
router.get("/getServiceById/:serviceId",getServiceById)
router.get("/usersPending/:serviceId",usersPending)
router.post("/add/:userId",upload.single('image'),addServiceToUser)
router.get("/getserviceUser/:userId", getServicesForUser)
router.get("/getUserNameOfService/:serviceId", getUserNameOfService)
router.get("/getServiceById/:serviceId", getServiceById)
router.post("/userApplyForJob/:userId/:serviceId", userApplyForJob)
router.post("/searchForServices/:userId", searchForServices)
router.post("/AcceptApply/:userId/:serviceId",AcceptApply)


module.exports = router;