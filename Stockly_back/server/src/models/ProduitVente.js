const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Produit = require('./Produit');
const Vente = require('./Sale');

const ProduitVente = sequelize.define('ProduitVente', {
    idProduit: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prix: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codeVente : {
        type: DataTypes.STRING,
        allowNull: false
    }
});

ProduitVente.belongsTo(Produit, {
    foreignKey: 'idProduit',
    allowNull: false
});

module.exports = ProduitVente;
