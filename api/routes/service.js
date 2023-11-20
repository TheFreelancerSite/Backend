const express = require("express");
const router = express.Router();
const multer =require('multer')
const upload = multer();
const { addServiceToUser, getServicesForUser, getUserNameOfService, getServiceById, userApplyForJob, usersPending, AcceptApply,getServicesForSpecificUser, isServiceHaveAcceptedUser, getTheAcceptedUser, updatingRequestWhenServiceFinish, isUserCompleteJob, updateThestars, giveReview, averageRatingStars, getAllReviewsForUser} = require("../controllers/service")


router.get("/getserviceUser/:userId",getServicesForUser)    
router.get("/getServicesForSpecificUser/:userId",getServicesForSpecificUser)
router.get("/getUserNameOfService/:serviceId",getUserNameOfService)
router.get("/getServiceById/:serviceId",getServiceById)
router.get("/usersPending/:serviceId",usersPending)
router.get("/isServiceHaveAcceptedUser/:serviceId",isServiceHaveAcceptedUser)
router.get("/isUserCompleteJob/:userId/:serviceId",isUserCompleteJob)
router.get("/getTheAcceptedUser/:serviceId",getTheAcceptedUser)
router.get("/getUserNameOfService/:serviceId", getUserNameOfService)
router.post("/add/:userId",upload.single('image'),addServiceToUser)
router.get("/getServiceById/:serviceId", getServiceById)
router.get("/averageRatingStars/:userId",averageRatingStars)
router.get("/getAllReviewsForUser/:userId",getAllReviewsForUser)
router.post("/userApplyForJob/:userId/:serviceId", userApplyForJob)
router.post("/AcceptApply/:userId/:serviceId",AcceptApply)
router.put("/validatingService/:userId/:serviceId",updatingRequestWhenServiceFinish)
router.put("/updateThestars/:serviceId",updateThestars)
router.put("/giveReview/:serviceId",giveReview)


module.exports = router;