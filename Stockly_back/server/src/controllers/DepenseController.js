const Depense = require('../models/Depense');

exports.getAllDepenses = async (req, res) => {
    try {
        const depenses = await Depense.findAll();
        res.json(depenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createDepense = async (req, res) => {
    const { libelle, montant, date } = req.body;
    try {
        const depense = await Depense.create({ libelle, montant, date });
        res.status(201).json(depense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getDepenseById = async (req, res) => {
    const { id } = req.params;
    try {
        const depense = await Depense.findByPk(id);
        if (!depense) return res.status(404).json({ message: "La dépense n'existe pas!" });
        res.status(200).json(depense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateDepenseById = async (req, res) => {
    const { id } = req.params;
    const { libelle, montant, date } = req.body;
    try {
        const depense = await Depense.findByPk(id);
        if (!depense) return res.status(404).json({ message: "La dépense n'existe pas!" });
        await depense.update({ libelle, montant, date });
        res.status(200).json({ message: 'Dépense modifiée avec succès!', depense });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteDepenseById = async (req, res) => {
    const { id } = req.params;
    try {
        const depense = await Depense.findByPk(id);
        if (!depense) return res.status(404).json({ message: "La dépense n'existe pas!" });
        await depense.destroy();
        res.status(200).json({ message: `Dépense supprimée avec succès!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getCountDepenses = async (req, res) => {
    try {
        const { count } = await Depense.findAndCountAll();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getTotalDepenses = async (req, res) => {
    try {
        const somme = await Depense.sum('montant');
        res.json({ somme });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


