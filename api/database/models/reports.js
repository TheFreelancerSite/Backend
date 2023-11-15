"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class reports extends Model {
    static associate(models) {
      reports.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
      reports.belongsTo(models.service, { foreignKey: 'serviceId', as: 'service' });
    }
  }

  reports.init(
    {
      // Define your report attributes here
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "reports",
      tableName: 'reports'
    }
  );

  return reports;
};
