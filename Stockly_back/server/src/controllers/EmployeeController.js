const Employe = require('../models/Employe')
const Role = require('../models/Role')

exports.getAllEmployes = async (req, res) => {
    try {
        const employes = await Employe.findAll({
            include: {
                model: Role,
                attributes: ['libelle']
            }
        });
        res.json(employes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createEmploye = async (req, res) => {
    const { nom, prenom, adresse, contact, idRole } = req.body;
    try {
        const employe = await Employe.create({ nom, prenom, adresse, contact, idRole });
        res.status(201).json(employe);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getEmployeById = async (req, res) => {
    const { id } = req.params;
    try {
        const employe = await Employe.findByPk(id, {
            include: {
                model: Role,
                attributes: ['libelle']
            }
        });
        if (!employe) return res.status(404).json({ message: "L'employé n'existe pas!" })
        res.status(200).json(employe);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateEmployeById = async (req, res) => {
    const { id } = req.params;
    const { nom, prenom, adresse, contact, idRole } = req.body;
    try {
        const employe = await Employe.findByPk(id);
        if (!employe) return res.status(404).json({ message: "L'employé n'existe pas!" })
        await employe.update({ nom, prenom, adresse, contact, idRole })
        res.status(200).json({ message: 'Employé modifié avec succès!', employe });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteEmployeById = async (req, res) => {
    const { id } = req.params;
    try {
        const employe = await Employe.findByPk(id);
        if (!employe) return res.status(404).json({ message: "L'employé n'existe pas!" })
        await employe.destroy();
        res.status(200).json({ message: `Employé supprimé avec succès!` });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
