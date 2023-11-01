'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        userName: 'John',
        email: 'demo@demo.com',
        password: '$321!pass!123$',
        imgUrl:"effefef",
        country:"London",
        phone:"98654750",
        description :"i'm very very happy",
        isSeller :true ,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },
down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

