const router = require('express').Router()
const logController = require('../controllers/LogController')

router.get('/', logController.getAllLogs);
router.post('/', logController.createLog);

module.exports = { logRouter: router };