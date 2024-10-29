const { DataTypes } = require('sequelize')
const sequelize = require('./database')

const Paiement = sequelize.define('Paiement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    libellePaiement: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descriptionPaiement: {
        type: DataTypes.STRING,
        allowNull: true
    },
    logoPaiement: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Paiement;