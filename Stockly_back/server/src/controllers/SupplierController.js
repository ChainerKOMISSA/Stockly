const Supplier = require('../models/Supplier');

exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createSupplier = async (req, res) => {
    const { nom, adresse, contact } = req.body;
    try {
        const supplier = await Supplier.create({ nom, adresse, contact });
        res.status(201).json(supplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getSupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const supplier = await Supplier.findByPk(id);
        if (!supplier) return res.status(404).json({ message: "Le fournisseur n'existe pas!" });
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateSupplierById = async (req, res) => {
    const { id } = req.params;
    const { nom, adresse, contact } = req.body;
    try {
        const supplier = await Supplier.findByPk(id);
        if (!supplier) return res.status(404).json({ message: "Le fournisseur n'existe pas!" });
        await supplier.update({ nom, adresse, contact });
        res.status(200).json({ message: 'Fournisseur modifié avec succès!', supplier });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteSupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const supplier = await Supplier.findByPk(id);
        if (!supplier) return res.status(404).json({ message: "Le fournisseur n'existe pas!" });
        await supplier.destroy();
        res.status(200).json({ message: `Fournisseur supprimé avec succès!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
