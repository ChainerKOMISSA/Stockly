const router = require('express').Router();
const supplierController = require('../controllers/SupplierController');

router.get('/', supplierController.getAllSuppliers);
router.post('/', supplierController.createSupplier);
router.get('/:id', supplierController.getSupplierById);
router.put('/:id', supplierController.updateSupplierById);
router.delete('/:id', supplierController.deleteSupplierById);

module.exports = { supplierRouter: router };
