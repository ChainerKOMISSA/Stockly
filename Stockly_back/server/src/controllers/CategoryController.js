const Categorie = require('../models/Categorie')

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Categorie.findAll();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createCategory = async (req, res) => {
    const { libelle, description } = req.body;
    try {
        const category = await Categorie.create({ libelle, description });
        res.status(201).json(category);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Categorie.findByPk(id);
        if (!category) return res.status(404).json({ message: "La catégorie n'existe pas!" })
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateCategoryById = async (req, res) => {
    const { id } = req.params;
    const { libelle, description } = req.body;
    try {
        const category = await Categorie.findByPk(id);
        if (!category) return res.status(404).json({ message: "La catégorie n'existe pas!" })
        await category.update({ libelle, description })
        res.status(200).json({ message: 'Catégorie modifiée avec succès!', category });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Categorie.findByPk(id);
        if (!category) return res.status(404).json({ message: "La catégorie n'existe pas!" })
        await category.destroy();
        res.status(200).json({ message: `Catégorie supprimée avec succès!` });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}