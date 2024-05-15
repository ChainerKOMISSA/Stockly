const ProduitVente = require('../models/ProduitVente');
const Vente = require('../models/Sale');
const Produit = require('../models/Produit');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const sequelize = require('../models/database')


exports.getAllProduitVentes = async (req, res) => {
    try {
        const produitVentes = await ProduitVente.findAll();
        res.json(produitVentes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createProduitVente = async (req, res) => {
    // const listeProduit = req.body;
    const { idVente, produits } = req.body;
    try {
        // Créer un tableau de données en ajoutant l'ID de la vente à chaque produit
        const produitsAvecVenteId = produits.map(produit => ({ ...produit, idVente }));
        const produitVentes = await ProduitVente.bulkCreate(produitsAvecVenteId);
        res.status(201).json(produitVentes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getProduitVenteById = async (req, res) => {
    const { id } = req.params;
    try {
        const produitVente = await ProduitVente.findAll({
            where: {
                idVente: id
            },
            include: {
                model: Produit,
                attributes: ['nom']
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

exports.getTotalProduitVente = async (req, res) => {
    try {
        const somme = await sequelize.query('SELECT sum(prix * quantite) AS total FROM produitventes', {
            type: QueryTypes.SELECT
        });

        res.json({ somme: somme[0].total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


exports.getTotalSalesByDay = async (req, res) => {
    const { month } = req.body;
    try {

        const monthNumber = parseInt(month, 10);

        const startOfMonth = new Date(new Date().getFullYear(), monthNumber - 1, 1);
        const formattedStartOfMonth = formatDate(startOfMonth);

        const endOfMonth = new Date(new Date().getFullYear(), monthNumber, 0);
        const formattedEndOfMonth = formatDate(endOfMonth);

        let query = `
            SELECT DATE(V.dateVente) AS DateOfSale, SUM(P.prix * P.quantite) AS TOTAL
            FROM ventes V
            JOIN produitventes P ON V.id = P.idVente
            WHERE YEAR(V.dateVente) = ? AND MONTH(V.dateVente) = ?
            GROUP BY DATE(V.dateVente);
        `;

        // Résolution de la promesse avec await
        let totalSalesByDay = await sequelize.query(query, {
            replacements: [new Date().getFullYear(), monthNumber],
            type: sequelize.QueryTypes.SELECT
        });

        res.status(200).json({
            dataTotal: totalSalesByDay
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




