const { DataTypes } = require('sequelize')
const sequelize = require('./database')

const Categorie = sequelize.define('Categorie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    libelle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Categorie;