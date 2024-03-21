const Livraison = require('../models/Delivery');

exports.getAllLivraisons = async (req, res) => {
    try {
        const livraisons = await Livraison.findAll();
        res.json(livraisons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createLivraison = async (req, res) => {
    const { dateLivraison, idCommande } = req.body;
    try {
        const livraison = await Livraison.create({ dateLivraison, idCommande });
        res.status(201).json(livraison);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getLivraisonById = async (req, res) => {
    const { id } = req.params;
    try {
        const livraison = await Livraison.findByPk(id);
        if (!livraison) return res.status(404).json({ message: "La livraison n'existe pas!" });
        res.status(200).json(livraison);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateLivraisonById = async (req, res) => {
    const { id } = req.params;
    const { dateLivraison, idCommande } = req.body;
    try {
        const livraison = await Livraison.findByPk(id);
        if (!livraison) return res.status(404).json({ message: "La livraison n'existe pas!" });
        await livraison.update({ dateLivraison, idCommande });
        res.status(200).json({ message: "Livraison modifiée avec succès!", livraison });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteLivraisonById = async (req, res) => {
    const { id } = req.params;
    try {
        const livraison = await Livraison.findByPk(id);
        if (!livraison) return res.status(404).json({ message: "La livraison n'existe pas!" });
        await livraison.destroy();
        res.status(200).json({ message: "Livraison supprimée avec succès!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
