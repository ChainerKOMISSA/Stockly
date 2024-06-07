const Vente = require('../models/Sale');
const Employe = require('../models/Employe')
const Produit = require('../models/Produit')
const ProduitVente = require('../models/ProduitVente')
const sequelize = require('../models/database')


exports.getAllVentes = async (req, res) => {
    try {
        const ventes = await Vente.findAll({
            include: {
                model: Employe,
                attributes: ['nom', 'prenom']
            }
        });
        res.json(ventes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createVente = async (req, res) => {
    const { dateVente, idEmploye, codeVente } = req.body;
    try {
        const vente = await Vente.create({ dateVente, idEmploye, codeVente });
        // res.status(201).json(vente);
        res.status(201).json({ id: vente.id, ...vente._doc }); // Ajouter l'ID dans la réponse
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
                attributes: ['nom', 'prenom']
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

// exports.getTop5Produits = async (req, res) => {
//     try {
//         const topProduits = await Produit.findAll({
//             attributes: [
//                 'id',
//                 'nom',
//                 [sequelize.fn('SUM', sequelize.col('ProduitVentes.quantite')), 'total_sold']
//             ],
//             include: [{
//                 model: ProduitVente,
//                 attributes: [],
//                 as: 'ventes'
//             }],
//             group: ['Produit.id'],
//             order: [[sequelize.literal('total_sold'), 'DESC']],
//             limit: 5
//         });

//         res.status(200).json(topProduits);
//     } catch (error) {
//         console.error('Erreur lors de la récupération des produits les plus vendus:', error);
//         res.status(500).json({ message: 'Erreur interne du serveur' });
//     }
// };