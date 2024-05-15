const { Sequelize } = require('sequelize');

// console.log('process.env.DATABASE',process.env.DATABASE);

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, null, {
    host: process.env.HOST,
    port : 3306,
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize