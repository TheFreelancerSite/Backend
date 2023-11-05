module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('services', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true, 
      references: {
        model: 'users', 
        key: 'id',      
      },
      onUpdate: 'CASCADE',  
      onDelete: 'CASCADE', 
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('services', 'userId');
  }
};
