const { Op } = require("sequelize");
const Produit = require('../models/Produit')
const Categorie = require('../models/Categorie');
const { QueryTypes } = require('sequelize');
const sequelize = require('../models/database')

exports.getAllProducts = async (req, res) => {
    try {
        const produits = await Produit.findAll({
            include: {
                model: Categorie,
                attributes: ['id', 'libelle']
            },
            order: [
                [Categorie, 'libelle', 'ASC'],
                ['nom', 'ASC']
            ]
        });
        res.json(produits)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.createProduct = async (req, res) => {
    const { nom, prix, quantiteStock, datePeremption, idCategorie } = req.body;
    try {
        const produit = await Produit.create({ nom, prix, quantiteStock, datePeremption, idCategorie });
        res.status(201).json(produit);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const produit = await Produit.findByPk(id,
            {
                include: {
                    model: Categorie,
                    attributes: ['libelle']
                }
            });
        if (!produit) return res.status(404).json({ message: "Le produit n'existe pas!" })
        res.status(200).json(produit);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateProductById = async (req, res) => {
    const { id } = req.params;
    const { nom, prix, quantiteStock, datePeremption, idCategorie } = req.body;
    try {
        const produit = await Produit.findByPk(id);
        if (!produit) return res.status(404).json({ message: "Le produit n'existe pas!" })
        await produit.update({ nom, prix, quantiteStock, datePeremption, idCategorie })
        res.status(200).json({ message: "Produit modifé avec succès" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateProductQuantityById = async (req, res) => {
    const { id } = req.params;
    const { quantitySold } = req.body; // Modifier pour correspondre à la structure de données envoyée depuis le frontend
    try {
        const produit = await Produit.findByPk(id);
        if (!produit) return res.status(404).json({ message: "Le produit n'existe pas!" });

        // Décrémenter la quantité vendue de la quantité actuelle du produit
        const newQuantity = produit.quantiteStock - quantitySold;

        // Mettre à jour la quantité du produit avec la nouvelle quantité calculée
        await produit.update({ quantiteStock: newQuantity });

        res.status(200).json({ message: "Produit modifié avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProductQuantityAfterOrder = async (req, res) => {
    const { produits } = req.body;
    try {
        for (let produit of produits) {
            const { idProduit, quantite } = produit;

            try {
                const product = await Produit.findByPk(idProduit);

                if (!product) {
                    return res.status(404).json({ message: "Le produit n'existe pas!" });
                }

                const newQuantity = product.quantiteStock + quantite;

                await product.update({ quantiteStock: newQuantity });
            } catch (error) {
                return res.status(500).json({ message: `Erreur lors de la mise à jour du produit avec l'ID ${id}: ${error.message}` });
            }
        }

        res.status(200).json({ message: "Produits modifiés avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const produit = await Produit.findByPk(id);
        if (!produit) return res.status(404).json({ message: "Le produit n'existe pas!" })
        await produit.destroy();
        res.status(200).json({ message: 'Le produit a été supprimé!' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getLiquidation = async (req, res) => {
    try {
        const produits = await Produit.findAll({
            include: {
                model: Categorie,
                attributes: ['libelle']
            },
            where: {
                datePeremption: {
                    [Op.lt]: new Date()
                }
            }
        });
        res.json(produits)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getLiquidationCount = async (req, res) => {
    try {
        const nbcount = await Produit.findAndCountAll({
            where: {
                datePeremption: {
                    [Op.lt]: new Date()
                }
            }
        });
        res.json(nbcount)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getRupture = async (req, res) => {
    try {
        const produits = await Produit.findAll({
            include: {
                model: Categorie,
                attributes: ['libelle']
            },
            where: {
                quantiteStock: {
                    [Op.lt]: 6
                }
            }
        });
        res.json(produits)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getCountRupture = async (req, res) => {
    try {
        const nbRupture = await Produit.count({
            where: {
                quantiteStock: {
                    [Op.lt]: 6
                }
            }
        });
        res.json({ nbRupture })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getCountProd = async (req, res) => {
    try {
        const count = await Produit.findAndCountAll({});
        res.json(count)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}