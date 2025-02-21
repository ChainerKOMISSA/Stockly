const router = require('express').Router();
const depenseController = require('../controllers/DepenseController');

router.get('/', depenseController.getAllDepenses);
router.get('/count', depenseController.getCountDepenses);
router.get('/total', depenseController.getTotalDepenses);
router.post('/', depenseController.createDepense);
router.get('/:id', depenseController.getDepenseById);
router.put('/:id', depenseController.updateDepenseById);
router.delete('/:id', depenseController.deleteDepenseById);

module.exports = { depenseRouter: router };
