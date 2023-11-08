'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class admin extends Model {
        static associate(model) {
            // Define associations here, if any.
        }
    }
    admin.init({
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        imgUrl: { type: DataTypes.STRING },
        
    }, {
        sequelize,
        modelName: 'admin', 
    });

    return admin

}
