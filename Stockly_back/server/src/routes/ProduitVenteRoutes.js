const router = require('express').Router();
const produitVenteController = require('../controllers/ProduitVenteController');

router.get('/', produitVenteController.getAllProduitVentes);
router.get('/:code', produitVenteController.getProduitVenteById);
router.post('/', produitVenteController.createProduitVente);
router.put('/:id', produitVenteController.updateProduitVenteById);
router.delete('/:id', produitVenteController.deleteProduitVenteById);

module.exports = { produitVenteRouter: router };
