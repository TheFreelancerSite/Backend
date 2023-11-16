'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.user, { foreignKey: 'reviewerId', as: 'reviewer' });
      Review.belongsTo(models.user, { foreignKey: 'reviewedUserId', as: 'reviewedUser' });

    }
  }
  Review.init({
    rating: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    reviewerId: DataTypes.INTEGER,
    reviewedUserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};