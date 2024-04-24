const Log = require('../models/Log')

exports.getAllLogs = async (req, res) => {
    try {
        const logs = await Log.findAll();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createLog = async (req, res) => {
    const { date, libelle_action, auteur, statut } = req.body;
    try {
        const log = await Log.create({ date, libelle_action, auteur, statut });
        res.status(201).json(log);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}