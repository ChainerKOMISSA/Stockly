const router = require('express').Router();
const livraisonController = require('../controllers/DeliveryController');

router.get('/', livraisonController.getAllLivraisons);
router.post('/', livraisonController.createLivraison);
router.get('/:id', livraisonController.getLivraisonById);
router.put('/:id', livraisonController.updateLivraisonById);
router.delete('/:id', livraisonController.deleteLivraisonById);

module.exports = { livraisonRouter: router };
