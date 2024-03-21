const { DataTypes } = require('sequelize')
const sequelize = require('./database')
const Commande = require('./Order')

const Livraison = sequelize.define('Livraison', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dateLivraison: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

Livraison.belongsTo(Commande, {
    foreignKey: 'idCommande',
    allowNull: false
});

module.exports = Livraison;