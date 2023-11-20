const db = require("../database/index");
const { Sequelize, Op } = require("sequelize");
module.exports = {
  addReview: async (req, res) => {
    const { reviewerId, reviewedUserId } = req.params;
    const { rating, comment } = req.body;
    try {
      const review = await db.review.create({
        reviewerId,
        reviewedUserId,
        rating,
        comment,
      });
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json(error);
      throw new Error('Error adding review: ' + error.message);
    }
  },

  getReviewsByUserId: async (req, res) => {
    const { userId } = req.params;

    try {
      const user = await db.User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const receivedReviews = await db.review.findAll({
        where: { reviewedUserId: userId },
      });

      const givenReviews = await db.review.findAll({
        where: { reviewerId: userId },
      });

      // Fetch reviewer information for received reviews
      const receivedReviewsWithReviewerInfo = await Promise.all(
        receivedReviews.map(async (review) => {
          const reviewerInfo = await db.User.findByPk(review.reviewerId, {
            attributes: ['userName', 'imgUrl'],
          });
          return { ...review.toJSON(), reviewer: reviewerInfo };
        })
      );

      const givenReviewsWithReviewerInfo = await Promise.all(
        givenReviews.map(async (review) => {
          const reviewerInfo = await db.User.findByPk(review.reviewerId, {
            attributes: ['userName', 'imgUrl'],
          });
          return { ...review.toJSON(), reviewer: reviewerInfo };
        })
      );

      res.status(200).json({ receivedReviews: receivedReviewsWithReviewerInfo, givenReviews: givenReviewsWithReviewerInfo });
    } catch (error) {
      res.status(500).json(error);
      throw new Error('Error getting reviews: ' + error.message);
    }
  },

  averageRatingStars: async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await db.User.findOne({
        where: {
          id: userId,
        },
      })  ;
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const result = await db.review.findOne({
        attributes: [
          [Sequelize.fn("AVG", Sequelize.col("rating")), "averageRating"],
        ],
        where: {
          reviewedUserId: {
            [Op.eq]: userId,
          },
        },
      });
  
      const averageRating = result.dataValues.averageRating;
  
      res.status(200).json({ averageRating });
    } catch (error) {
      console.error("Error calculating average rating:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
