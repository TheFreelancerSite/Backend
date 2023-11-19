const express = require("express");
const { addReview, getReviewsByUserId, averageRatingStars } = require("../controllers/review");
const router = express.Router();

router.post("/addReview/:reviewerId/:reviewedUserId",addReview)
router.get("/getReviewsByUserId/:userId",getReviewsByUserId)
router.get("/averageRatingStars/:userId",averageRatingStars)
module.exports = router;