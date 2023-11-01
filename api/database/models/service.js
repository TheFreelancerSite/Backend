'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service extends Model {
    static associate(models) {
      // define association here
    }
  }
  service.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    totalStars: DataTypes.INTEGER,
    category: DataTypes.STRING,
    price: {
      type: DataTypes.FLOAT,
      allowNull: false, 
    },
    job_img: DataTypes.STRING,
    deliveryTime: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    feautures: DataTypes.STRING,
    serviceReviews: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'service',
  });
  return service;
};
