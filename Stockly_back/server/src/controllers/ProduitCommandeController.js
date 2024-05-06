const ProduitCommande = require('../models/ProduitCommande');
const Produit = require('../models/Produit');


exports.getAllProduitCommandes = async (req, res) => {
    try {
        const produitCommandes = await ProduitCommande.findAll();
        res.json(produitCommandes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createProduitCommande = async (req, res) => {
    // const listeProduit = req.body;
    const { idCommande, produits } = req.body;
    try {
        const produitAvecCmdId = produits.map(produit => ({ ...produit, idCommande }))
        const produitCommandes = await ProduitCommande.bulkCreate(produitAvecCmdId);
        res.status(201).json(produitCommandes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getProduitCommandeById = async (req, res) => {
    const { id } = req.params;
    try {
        const produitCommande = await ProduitCommande.findAll({
            where: {
                idCommande: id
            },
            include: {
                model: Produit,
                attributes : ['nom']
            }
        });
        if (!produitCommande) return res.status(404).json({ message: "La commande de produit n'existe pas!" });
        res.status(200).json(produitCommande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateProduitCommandeById = async (req, res) => {
    const { id } = req.params;
    const { prixAchat, quantite, idProduit, idCommande } = req.body;
    try {
        const produitCommande = await ProduitCommande.findByPk(id);
        if (!produitCommande) return res.status(404).json({ message: "La commande de produit n'existe pas!" });
        await produitCommande.update({ prixAchat, quantite, idProduit, idCommande });
        res.status(200).json({ message: "Commande de produit modifiée avec succès!", produitCommande });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteProduitCommandeById = async (req, res) => {
    const { id } = req.params;
    try {
        const produitCommande = await ProduitCommande.findByPk(id);
        if (!produitCommande) return res.status(404).json({ message: "La commande de produit n'existe pas!" });
        await produitCommande.destroy();
        res.status(200).json({ message: "Commande de produit supprimée avec succès!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
