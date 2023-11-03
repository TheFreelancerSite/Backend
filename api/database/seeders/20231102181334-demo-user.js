module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      userName: 'hichem',
        email: 'demo@demo.com',
        password: '$321!pass!123$',
        imgUrl:"effedededefef",
        country:"tunisia",
        phone:"98342799",
        description :"i'm very very confused",
        isSeller :true ,
        createdAt: new Date(),
        updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};