const router = require('express').Router();
const produitCommandeController = require('../controllers/ProduitCommandeController');

router.get('/', produitCommandeController.getAllProduitCommandes);
router.post('/', produitCommandeController.createProduitCommande);
router.get('/:id', produitCommandeController.getProduitCommandeById);
router.put('/:id', produitCommandeController.updateProduitCommandeById);
router.delete('/:id', produitCommandeController.deleteProduitCommandeById);

module.exports = { produitCommandeRouter: router };
