const { DataTypes } = require('sequelize')
const sequelize = require('./database')

const Supplier = sequelize.define('Fournisseur', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Supplier;