const { DataTypes } = require('sequelize')
const sequelize = require('./database')

const Incident = sequelize.define('Incident', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    libelle: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Incident;