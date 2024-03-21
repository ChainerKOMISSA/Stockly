const Role = require('../models/Role');

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createRole = async (req, res) => {
    const { libelle, description } = req.body;
    try {
        const role = await Role.create({ libelle, description });
        res.status(201).json(role);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getRoleById = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await Role.findByPk(id);
        if (!role) return res.status(404).json({ message: "Le rôle n'existe pas!" })
        res.status(200).json(role);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateRoleById = async (req, res) => {
    const { id } = req.params;
    const { libelle, description } = req.body;
    try {
        const role = await Role.findByPk(id);
        if (!role) return res.status(404).json({ message: "Le rôle n'existe pas!" })
        await role.update({ libelle, description })
        res.status(200).json({ message: 'Rôle modifié avec succès!', role });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteRoleById = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await Role.findByPk(id);
        if (!role) return res.status(404).json({ message: "Le rôle n'existe pas!" })
        await role.destroy();
        res.status(200).json({ message: `Rôle supprimé avec succès!` });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}