const router = require('express').Router();
const produitVenteController = require('../controllers/ProduitVenteController');

router.get('/', produitVenteController.getAllProduitVentes);
router.get('/total', produitVenteController.getTotalProduitVente);
router.get('/:id', produitVenteController.getProduitVenteById);
router.post('/', produitVenteController.createProduitVente);
router.post('/totalbyjour', produitVenteController.getTotalSalesByDay);
router.put('/:id', produitVenteController.updateProduitVenteById);
router.delete('/:id', produitVenteController.deleteProduitVenteById);

module.exports = { produitVenteRouter: router };
