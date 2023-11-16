"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models.reports, { foreignKey: "userId", as: "reports" });
      user.belongsToMany(models.service, {
        through: "requests",
        foreignKey: "userId",
        otherKey: "serviceId",
      });
      user.belongsToMany(models.user, {
        through: "conversation",
        as: "sender",
        foreignKey: "senderId",
      });

      user.belongsToMany(models.user, {
        through: "conversation",
        as: "receiver",
        foreignKey: "receiverId",
      });

      user.hasMany(models.service, {
        foreignKey: "userId",
        as: "services",
      });

      user.hasMany(models.review, {
        foreignKey: "reviewedUserId",
        as: "receivedReviews",
      });

      user.hasMany(models.review, {
        foreignKey: "reviewerId",
        as: "givenReviews",
      });
    }
  }
  user.init(
    {
      userName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: true },
      imgUrl: { type: DataTypes.STRING },
      country: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING, allowNull: true },
      isSeller: { type: DataTypes.BOOLEAN, defaultValue: false },
      google_id: { type: DataTypes.STRING },
      googleToken: { type: DataTypes.STRING },
      banned: { type: DataTypes.BOOLEAN, defaultValue: false },
      banExpires: { type: DataTypes.DATE, allowNull : true},
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
