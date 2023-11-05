'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      totalStars: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      job_img: {
        type: Sequelize.STRING
      },
      deliveryTime: {
        type: Sequelize.STRING
      },
      feautures: {
        type: Sequelize.STRING
      },
      serviceReviews: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('services');
  }
};