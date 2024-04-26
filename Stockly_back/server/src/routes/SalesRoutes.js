const router = require('express').Router();
const venteController = require('../controllers/SalesController');

router.get('/', venteController.getAllVentes);
router.get('/:id', venteController.getVenteById);
router.post('/', venteController.createVente);
router.put('/:id', venteController.updateVenteById);
router.delete('/:id', venteController.deleteVenteById);

module.exports = { venteRouter: router };
