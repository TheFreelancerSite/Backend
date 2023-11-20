'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
   
      
      
    }
  }
  requests.init({
    user_service_status: DataTypes.STRING,
    isCompleted: DataTypes.BOOLEAN,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      },
    },
    serviceId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'service',
        key: 'id'
      },
    },
    requester: {
      type: DataTypes.STRING,
    },    
  }, {
    sequelize,
    modelName: 'requests',
  });
  
  return requests;
};