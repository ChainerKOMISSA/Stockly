const { DataTypes } = require('sequelize')
const sequelize = require('./database')

const Depense = sequelize.define('Depense', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    libelle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    montant: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Depense;