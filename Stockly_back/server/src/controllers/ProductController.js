const { Op } = require("sequelize");
const Produit = require('../models/Produit')
const Categorie = require('../models/Categorie');


exports.getAllProducts = async (req, res) => {
    try {
        const produits = await Produit.findAll({
            include: {
                model: Categorie,
                attributes: ['libelle']
            }
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