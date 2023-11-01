'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('services', 'title', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('services', 'price', {
      type: Sequelize.FLOAT,
      allowNull: false,
    });

    await queryInterface.changeColumn('services', 'deliveryTime', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
