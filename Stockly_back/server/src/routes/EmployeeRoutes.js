const router = require('express').Router()
const employeController = require('../controllers/EmployeeController')

router.get('/', employeController.getAllEmployes);
router.get('/vendeurs', employeController.getAllEmployesVendeurs);
router.get('/:id', employeController.getEmployeById);
router.post('/', employeController.createEmploye);
router.post('/login', employeController.verifyEmploye);
router.put('/:id', employeController.updateEmployeById);
router.put('/identifiants/:id', employeController.updateEmployeLoginById);
router.delete('/:id', employeController.deleteEmployeById);

module.exports = { employeRouter: router };