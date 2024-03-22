const router = require('express').Router()
const employeController = require('../controllers/EmployeeController')

router.get('/', employeController.getAllEmployes);
router.get('/vendeurs', employeController.getAllEmployesVendeurs);
router.post('/', employeController.createEmploye);
router.get('/:id', employeController.getEmployeById);
router.put('/:id', employeController.updateEmployeById);
router.delete('/:id', employeController.deleteEmployeById);

module.exports = { employeRouter: router };