const Paiement = require('../models/Paiement')

exports.getAllPaiements = async (req, res) => {
    try {
        const paiements = await Paiement.findAll();
        res.json(paiements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createPaiement = async (req, res) => {
    const { libellePaiement, descriptionPaiement } = req.body;
    try {
        const paiement = await Paiement.create({ libellePaiement, descriptionPaiement });
        res.status(201).json(paiement);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getPaiementById = async (req, res) => {
    const { id } = req.params;
    try {
        const paiement = await Paiement.findByPk(id);
        if (!paiement) return res.status(404).json({ message: "Le paiement n'existe pas!" })
        res.status(200).json(paiement);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}