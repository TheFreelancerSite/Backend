"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.belongsToMany(models.service, {
        through: 'requests',
        foreignKey: 'userId',
        otherKey: 'serviceId',
      });

      user.belongsToMany(models.user, {
        through: 'conversation',
        as: 'sender',
        foreignKey: 'senderId',
      });

      user.belongsToMany(models.user, {
        through: 'conversation',
        as: 'receiver',
        foreignKey: 'receiverId',
      });
    }
  }
  user.init(
    {
      fullName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      imgUrl: { type: DataTypes.STRING },
      country: { type: DataTypes.STRING , allowNull: false },
      phone: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING, allowNull: true },
      isSeller: { type: DataTypes.BOOLEAN,  defaultValue: false},
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
