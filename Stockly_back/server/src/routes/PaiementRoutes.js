const router = require('express').Router()
const paiementController = require('../controllers/PaiementController')

router.get('/', paiementController.getAllPaiements);
router.post('/', paiementController.createPaiement);
router.get("/:id", paiementController.getPaiementById);

module.exports = { paiementRouter: router };