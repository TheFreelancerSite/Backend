const { Sequelize } = require('sequelize');
require("dotenv").config()

const sequelize = new Sequelize("freelance", "haithem", "1234" , {
  dialect: 'mysql',
  host: 'localhost', 
});
if (process.env.NODE_ENV === 'development') {
    sequelize.options.logging = console.log;
  }
const service = require('./models/service')(sequelize, Sequelize.DataTypes);
const User = require('./models/user')(sequelize, Sequelize.DataTypes);
const request =require("./models/requests")(sequelize, Sequelize.DataTypes);
module.exports = {
    sequelize,
    service,
    User,
    request
  };