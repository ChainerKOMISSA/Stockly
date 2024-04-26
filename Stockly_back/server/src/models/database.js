const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("dbstocklynew", "root", "Gwladystone@11", {
    host: "localhost",
    port : 3306,
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize