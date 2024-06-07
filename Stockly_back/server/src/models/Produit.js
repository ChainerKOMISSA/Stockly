const { DataTypes } = require('sequelize')
const sequelize = require('./database')
const Categorie = require('./Categorie')

const Produit = sequelize.define('Produit', {
    id: {
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
    quantiteStock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    datePeremption: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

Produit.belongsTo(Categorie, {
    foreignKey : 'idCategorie',
    allowNull : false
});


module.exports = Produit;