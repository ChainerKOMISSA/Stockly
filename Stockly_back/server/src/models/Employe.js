const { DataTypes } = require('sequelize')
const sequelize = require('./database')
const Role = require('./Role')

const Employe = sequelize.define('Employe', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    motdepasse: {
        type: DataTypes.STRING,
        allowNull: true
    },
    username : {
        type : DataTypes.STRING,
        allowNull : true
    }
});

Employe.belongsTo(Role, {
    foreignKey : 'idRole',
    allowNull : false
});

module.exports = Employe;