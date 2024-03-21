const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Produit = require('./Produit');
const Vente = require('./Sale');

const ProduitVente = sequelize.define('ProduitVente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    prix: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

ProduitVente.belongsTo(Produit, {
    foreignKey: 'idProduit',
    allowNull: false
});

ProduitVente.belongsTo(Vente, {
    foreignKey: 'idVente',
    allowNull: false
});

module.exports = ProduitVente;
