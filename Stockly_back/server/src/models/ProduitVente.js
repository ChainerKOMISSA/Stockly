const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Produit = require('./Produit');

const ProduitVente = sequelize.define('ProduitVente', {
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
