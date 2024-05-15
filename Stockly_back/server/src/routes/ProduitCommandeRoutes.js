const router = require('express').Router();
const produitCommandeController = require('../controllers/ProduitCommandeController');

router.get('/', produitCommandeController.getAllProduitCommandes);
router.get('/total', produitCommandeController.getTotalProduitCommande);
router.get('/:id', produitCommandeController.getProduitCommandeById);
router.post('/', produitCommandeController.createProduitCommande);
router.put('/:id', produitCommandeController.updateProduitCommandeById);
router.delete('/:id', produitCommandeController.deleteProduitCommandeById);

module.exports = { produitCommandeRouter: router };
