'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      conversation.belongsTo(models.user, { foreignKey: 'senderId', as: 'sender' });
      conversation.belongsTo(models.user, { foreignKey: 'receiverId', as: 'receiver' });

    }
  }
  conversation.init({
    senderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    receiverId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    message_content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      },
    }

  }, {
    sequelize,
    modelName: 'conversation',
  });
  return conversation;
};