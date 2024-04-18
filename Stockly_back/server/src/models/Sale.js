const { DataTypes } = require('sequelize')
const sequelize = require('./database')
const Employe = require('./Employe')

const Vente = sequelize.define('Vente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dateVente: {
        type: DataTypes.DATE,
        allowNull: false
    },
    codeVente: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Vente.belongsTo(Employe, {
    foreignKey: 'idEmploye',
    allowNull: false
});

module.exports = Vente;