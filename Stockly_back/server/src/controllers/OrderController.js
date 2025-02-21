const Commande = require('../models/Order');
const Fournisseur = require('../models/Supplier')

exports.getAllCommandes = async (req, res) => {
    try {
        const commandes = await Commande.findAll({
            include : {
                model : Fournisseur,
                attributes : ['nom']
            }
        });
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createCommande = async (req, res) => {
    const etat = "NV"; // Non validée par défaut
    const { dateCommande, idFournisseur, codeCommande } = req.body;
    try {
        const commande = await Commande.create({ dateCommande, idFournisseur, codeCommande, etat });
        // res.status(201).json(commande);
        res.status(201).json({ id: commande.id, ...commande._doc }); // Ajouter l'ID dans la réponse
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getCommandeById = async (req, res) => {
    const { id } = req.params;
    try {
        const commande = await Commande.findByPk(id, {
            include : {
                model : Fournisseur,
                attributes : ['nom']
            }
        });
        if (!commande) return res.status(404).json({ message: "La commande n'existe pas!" });
        res.status(200).json(commande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateCommandeById = async (req, res) => {
    const { id } = req.params;
    const { dateCommande,idFournisseur } = req.body;
    try {
        const commande = await Commande.findByPk(id);
        if (!commande) return res.status(404).json({ message: "La commande n'existe pas!" });
        await commande.update({ dateCommande, idFournisseur });
        res.status(200).json({ message: "Commande modifiée avec succès!", commande });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateCommandeStateById = async (req, res) => {
    const { id } = req.params;
    const { etat } = req.body;
    try {
        const commande = await Commande.findByPk(id);
        if (!commande) return res.status(404).json({ message: "La commande n'existe pas!" });
        await commande.update({ etat : etat });
        res.status(200).json({ message: "Commande modifiée avec succès!", commande });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateCommandeAddStockById = async (req, res) => {
    const { id } = req.params;
    const { addToStock } = req.body;
    try {
        const commande = await Commande.findByPk(id);
        if (!commande) return res.status(404).json({ message: "La commande n'existe pas!" });
        await commande.update({ addToStock : addToStock });
        res.status(200).json({ message: "Commande modifiée avec succès!", commande });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteCommandeById = async (req, res) => {
    const { id } = req.params;
    try {
        const commande = await Commande.findByPk(id);
        if (!commande) return res.status(404).json({ message: "La commande n'existe pas!" });
        await commande.destroy();
        res.status(200).json({ message: "Commande supprimée avec succès!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
