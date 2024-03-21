const { DataTypes } = require('sequelize')
const sequelize = require('./database')


const Commande = sequelize.define('Commande', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dateCommande: {
        type: DataTypes.DATE,
        allowNull: false
    }
});


module.exports = Commande;