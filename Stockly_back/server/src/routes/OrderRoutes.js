const router = require('express').Router();
const commandeController = require('../controllers/OrderController');

router.get('/', commandeController.getAllCommandes);
router.post('/', commandeController.createCommande);
router.get('/:id', commandeController.getCommandeById);
router.put('/:id', commandeController.updateCommandeById);
router.delete('/:id', commandeController.deleteCommandeById);

module.exports = { commandeRouter: router };