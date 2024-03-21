const Incident = require('../models/Incident');

exports.getAllIncidents = async (req, res) => {
    try {
        const incidents = await Incident.findAll();
        res.json(incidents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createIncident = async (req, res) => {
    const { libelle, date } = req.body;
    try {
        const incident = await Incident.create({ libelle, date });
        res.status(201).json(incident);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getIncidentById = async (req, res) => {
    const { id } = req.params;
    try {
        const incident = await Incident.findByPk(id);
        if (!incident) return res.status(404).json({ message: "L'incident n'existe pas!" });
        res.status(200).json(incident);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateIncidentById = async (req, res) => {
    const { id } = req.params;
    const { libelle, date } = req.body;
    try {
        const incident = await Incident.findByPk(id);
        if (!incident) return res.status(404).json({ message: "L'incident n'existe pas!" });
        await incident.update({ libelle, date });
        res.status(200).json({ message: "Incident modifié avec succès!", incident });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteIncidentById = async (req, res) => {
    const { id } = req.params;
    try {
        const incident = await Incident.findByPk(id);
        if (!incident) return res.status(404).json({ message: "L'incident n'existe pas!" });
        await incident.destroy();
        res.status(200).json({ message: "Incident supprimé avec succès!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
