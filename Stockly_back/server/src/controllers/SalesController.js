const Vente = require('../models/Sale');
const Employe = require('../models/Employe')


exports.getAllVentes = async (req, res) => {
    try {
        const ventes = await Vente.findAll({
            include: {
                model: Employe,
                attributes: ['nom']
            }
        });
        res.json(ventes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createVente = async (req, res) => {
    const { dateVente, idEmploye } = req.body;
    try {
        const vente = await Vente.create({ dateVente, idEmploye });
        res.status(201).json(vente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getVenteById = async (req, res) => {
    const { id } = req.params;
    try {
        const vente = await Vente.findByPk(id, {
            include: {
                model: Employe,
                attributes: ['nom']
            }
        });
        if (!vente) return res.status(404).json({ message: "La vente n'existe pas!" });
        res.status(200).json(vente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateVenteById = async (req, res) => {
    const { id } = req.params;
    const { dateVente, idEmploye } = req.body;
    try {
        const vente = await Vente.findByPk(id);
        if (!vente) return res.status(404).json({ message: "La vente n'existe pas!" });
        await vente.update({ dateVente, idEmploye });
        res.status(200).json({ message: "Vente modifiée avec succès!", vente });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteVenteById = async (req, res) => {
    const { id } = req.params;
    try {
        const vente = await Vente.findByPk(id);
        if (!vente) return res.status(404).json({ message: "La vente n'existe pas!" });
        await vente.destroy();
        res.status(200).json({ message: "Vente supprimée avec succès!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
