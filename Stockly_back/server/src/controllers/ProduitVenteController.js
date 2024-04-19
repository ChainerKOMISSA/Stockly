const ProduitVente = require('../models/ProduitVente');
const Produit = require('../models/Produit');

exports.getAllProduitVentes = async (req, res) => {
    try {
        const produitVentes = await ProduitVente.findAll();
        res.json(produitVentes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createProduitVente = async (req, res) => {
    const { nom, prix, quantite, codeVente, idProduit } = req.body;
    try {
        const produitVente = await ProduitVente.create({ nom, prix, quantite, codeVente, idProduit });
        res.status(201).json(produitVente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getProduitVenteById = async (req, res) => {
    const { code } = req.params;
    try {
        const produitVente = await ProduitVente.findAll({
            include :  {
                model : Produit,
                attributes : ['nom']
            },
            where : {
                codeVente : code
            }
        });
        if (!produitVente) return res.status(404).json({ message: "La vente de produit n'existe pas!" });
        res.status(200).json(produitVente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateProduitVenteById = async (req, res) => {
    const { id } = req.params;
    const { prix, quantite, idProduit, idVente } = req.body;
    try {
        const produitVente = await ProduitVente.findByPk(id);
        if (!produitVente) return res.status(404).json({ message: "La vente de produit n'existe pas!" });
        await produitVente.update({ prix, quantite, idProduit, idVente });
        res.status(200).json({ message: "Vente de produit modifiée avec succès!", produitVente });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteProduitVenteById = async (req, res) => {
    const { id } = req.params;
    try {
        const produitVente = await ProduitVente.findByPk(id);
        if (!produitVente) return res.status(404).json({ message: "La vente de produit n'existe pas!" });
        await produitVente.destroy();
        res.status(200).json({ message: "Vente de produit supprimée avec succès!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
