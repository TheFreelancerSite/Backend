'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service extends Model {
    static associate(models) {
      service.belongsTo(models.user, { foreignKey: 'userId' ,as:'owner' }); // Add this association
      service.belongsToMany(models.user, {
        through: 'requests',
        foreignKey: 'serviceId',
        otherKey: 'userId',
      });
    }
  }
  
  service.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    totalStars: {
      type: DataTypes.INTEGER,
      defaultValue: 0, 
    },
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
    description: DataTypes.STRING,
    owner:DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'service',
  });
  return service;
};
