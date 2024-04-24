const { DataTypes } = require('sequelize')
const sequelize = require('./database')

const Log = sequelize.define('Log', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    libelle_action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    auteur: {
        type: DataTypes.STRING,
        allowNull: false
    },
    statut: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = Log;