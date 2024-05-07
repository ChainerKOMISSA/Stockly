const router = require('express').Router();
const commandeController = require('../controllers/OrderController');

router.get('/', commandeController.getAllCommandes);
router.get('/:id', commandeController.getCommandeById);
router.post('/', commandeController.createCommande);
router.patch('/stock/:id', commandeController.updateCommandeAddStockById);
router.put('/:id', commandeController.updateCommandeById);
router.patch('/:id', commandeController.updateCommandeStateById);
router.delete('/:id', commandeController.deleteCommandeById);

module.exports = { commandeRouter: router };