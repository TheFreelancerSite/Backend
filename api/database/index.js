const { Sequelize } = require('sequelize');
require("dotenv").config()

const sequelize = new Sequelize("freelance", "abdou", "admin" , {
  dialect: 'mysql',
  host: 'localhost', 
});
console.log("heeeeeeeeeeeeee",process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD)

const Service = require('./models/service')(sequelize, Sequelize.DataTypes);
const User = require('./models/user')(sequelize, Sequelize.DataTypes);

module.exports = {
    sequelize,
    Service,
    User,
  };