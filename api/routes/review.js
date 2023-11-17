const express = require("express");
const { addReview, getReviewsByUserId } = require("../controllers/review");
const router = express.Router();

router.post("/addReview/:reviewerId/:reviewedUserId",addReview)
router.get("/getReviewsByUserId/:userId",getReviewsByUserId)
module.exports = router;    