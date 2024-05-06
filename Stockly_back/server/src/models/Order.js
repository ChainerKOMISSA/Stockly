const { DataTypes, BOOLEAN } = require('sequelize')
const sequelize = require('./database')
const Fournisseur = require('./Supplier')


const Commande = sequelize.define('Commande', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dateCommande: {
        type: DataTypes.DATE,
        allowNull: false
    },
    codeCommande: {
        type: DataTypes.STRING,
        allowNull: false
    },
    etat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    addToStock : {
        type : BOOLEAN,
        allowNull : true
    }
});

Commande.belongsTo(Fournisseur, {
    foreignKey : 'idFournisseur',
    allowNull : false
})

module.exports = Commande;