const router = require('express').Router();
const incidentController = require('../controllers/IncidentController');

router.get('/', incidentController.getAllIncidents);
router.post('/', incidentController.createIncident);
router.get('/:id', incidentController.getIncidentById);
router.put('/:id', incidentController.updateIncidentById);
router.delete('/:id', incidentController.deleteIncidentById);

module.exports = { incidentRouter: router };