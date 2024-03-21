const router = require('express').Router();
const venteController = require('../controllers/SalesController');

router.get('/', venteController.getAllVentes);
router.post('/', venteController.createVente);
router.get('/:id', venteController.getVenteById);
router.put('/:id', venteController.updateVenteById);
router.delete('/:id', venteController.deleteVenteById);

module.exports = { venteRouter: router };
