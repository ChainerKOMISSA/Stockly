const Employe = require('../models/Employe')
const Role = require('../models/Role')
const bcrypt = require('bcrypt');


// exports.getAllEmployes = async (req, res) => {
//     try {
//         var verifiedEmploye
//         const employes = await Employe.findAll({
//             include: {
//                 model: Role,
//                 attributes: ['libelle']
//             }
//         });
//         res.json(employes);
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

exports.getAllEmployes = async (req, res) => {
    try {
        const employes = await Employe.findAll({
            include: {
                model: Role,
                attributes: ['libelle']
            }
        });
        // Vérifier si l'employé a des identifiants
        // Ajouter le champ "verified" pour chaque employé
        const employesWithVerification = employes.map(employe => {
            return {
                ...employe.toJSON(), // Convertir l'employé en objet pour pouvoir ajouter des champs
                verified: (employe.username && employe.username !== "") &&
                    (employe.motdepasse && employe.motdepasse !== "") ? true : false
            };
        });

        // Envoyer la réponse avec les employés modifiés
        res.json(employesWithVerification);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAllEmployesVendeurs = async (req, res) => {
    try {
        const employes = await Employe.findAll({
            include: {
                model: Role,
                attributes: ['libelle']
            },
            where: {
                idRole: 2
            }
        });
        res.json(employes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createEmploye = async (req, res) => {
    const { nom, prenom, adresse, contact, idRole } = req.body;
    try {
        const employe = await Employe.create({ nom, prenom, adresse, contact, idRole });
        res.status(201).json(employe);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getEmployeById = async (req, res) => {
    const { id } = req.params;
    try {
        const employe = await Employe.findByPk(id, {
            include: {
                model: Role,
                attributes: ['libelle']
            }
        });
        if (!employe) return res.status(404).json({ message: "L'employé n'existe pas!" })
        res.status(200).json(employe);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateEmployeById = async (req, res) => {
    const { id } = req.params;
    const { nom, prenom, adresse, contact, idRole } = req.body;
    try {
        const employe = await Employe.findByPk(id);
        if (!employe) return res.status(404).json({ message: "L'employé n'existe pas!" })
        await employe.update({ nom, prenom, adresse, contact, idRole })
        res.status(200).json({ message: 'Employé modifié avec succès!', employe });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateEmployeLoginById = async (req, res) => {
    const { id } = req.params;
    const { username, motdepasse } = req.body;
    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    try {
        const employe = await Employe.findByPk(id);
        if (!employe) return res.status(404).json({ message: "L'employé n'existe pas!" })
        await employe.update({ username, motdepasse: hashedPassword })
        res.status(200).json({ message: 'Employé modifié avec succès!', employe });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteEmployeById = async (req, res) => {
    const { id } = req.params;
    try {
        const employe = await Employe.findByPk(id);
        if (!employe) return res.status(404).json({ message: "L'employé n'existe pas!" })
        await employe.destroy();
        res.status(200).json({ message: `Employé supprimé avec succès!` });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.verifyEmploye = async (req, res) => {
    const { username, motdepasse } = req.body;
    try {
        const employe = await Employe.findOne({
            where: { username: username } // Explicitly define the where clause
        });
        if (employe) {
            const passwordMatch = await bcrypt.compare(motdepasse, employe.motdepasse);
            if (passwordMatch) {
                return res.status(200).json({ success: true, message: "Connexion réussie", data: employe });
            }
            else {
                return res.status(401).json({ success: false, message: "Mot de passe incorrect" });
            }
        } else {
            return res.status(401).json({ success: false, message: "Utilisateur inexistant" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
