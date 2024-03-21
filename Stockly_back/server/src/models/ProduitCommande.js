const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Produit = require('./Produit');
const Commande = require('./Order');

const ProduitCommande = sequelize.define('ProduitCommande', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    prixAchat: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

ProduitCommande.belongsTo(Produit, {
    foreignKey: 'idProduit',
    allowNull: false
});

ProduitCommande.belongsTo(Commande, {
    foreignKey: 'idCommande',
    allowNull: false
});

module.exports = ProduitCommande;