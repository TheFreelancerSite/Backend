'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('requests', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    }).then(() => {
      return queryInterface.addColumn('requests', 'serviceId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'services',
          key: 'id',
        },
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('requests', 'userId').then(() => {
      return queryInterface.removeColumn('requests', 'serviceId');
    });
  },
};
