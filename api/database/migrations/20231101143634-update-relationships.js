'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add foreign keys to associate conversations with users
    await queryInterface.addColumn('conversations', 'senderId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
    });

    await queryInterface.addColumn('conversations', 'receiverId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
    });

    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the added foreign keys
    await queryInterface.removeColumn('conversations', 'senderId');
    await queryInterface.removeColumn('conversations', 'receiverId');

    return Promise.resolve();
  },
};
