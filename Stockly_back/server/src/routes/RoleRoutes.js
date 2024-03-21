const router = require('express').Router();
const roleController = require('../controllers/RoleController');

router.get('/', roleController.getAllRoles);
router.post('/', roleController.createRole);
router.get('/:id', roleController.getRoleById);
router.put('/:id', roleController.updateRoleById);
router.delete('/:id', roleController.deleteRoleById);

module.exports = { roleRouter: router };