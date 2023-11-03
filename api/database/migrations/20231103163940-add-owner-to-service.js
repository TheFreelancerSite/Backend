module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('services', 'owner', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('services', 'owner');
  }
};
