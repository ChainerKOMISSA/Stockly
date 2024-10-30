require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./src/models/database')
const fs = require('fs')
const filePath = "./server/boutiqueData.json";

const PORT = process.env.PORT || 3001;
const app = express();

const { categoryRouter } = require('./src/routes/CategoryRoutes');
const { productRouter } = require('./src/routes/ProductRoutes');
const { employeRouter } = require('./src/routes/EmployeeRoutes');
const { roleRouter } = require('./src/routes/RoleRoutes');
const { supplierRouter } = require('./src/routes/SupplierRoutes');
const { depenseRouter } = require('./src/routes/DepenseRoutes')
const { incidentRouter } = require('./src/routes/IncidentRoutes');
const { commandeRouter } = require('./src/routes/OrderRoutes');
const { livraisonRouter } = require('./src/routes/DeliveryRoutes');
const { venteRouter } = require('./src/routes/SalesRoutes');
const { produitVenteRouter } = require('./src/routes/ProduitVenteRoutes')
const { produitCommandeRouter } = require('./src/routes/ProduitCommandeRoutes')
const { logRouter } = require('./src/routes/LogRoutes');
const { paiementRouter } = require('./src/routes/PaiementRoutes');



// MySQL connection
const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Connection has been established successfully.');
        app.use(cors());
        app.use(bodyParser.json());

        // Routers
        app.get('/', (req, res) => {
            res.json({ message: "Hello from server" });
        })

        app.use('/categories', categoryRouter)
        app.use('/produits', productRouter)
        app.use('/employes', employeRouter)
        app.use('/roles', roleRouter)
        app.use('/suppliers', supplierRouter)
        app.use('/depenses', depenseRouter)
        app.use('/incidents', incidentRouter)
        app.use('/commandes', commandeRouter)
        app.use('/ventes', venteRouter)
        app.use('/livraisons', livraisonRouter)
        app.use('/produitvente', produitVenteRouter)
        app.use('/produitcommande', produitCommandeRouter)
        app.use('/paiements', paiementRouter)
        app.use('/logs', logRouter)

        // Route pour obtenir les données de la boutique
        app.get('/boutique', (req, res) => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error("Erreur de lecture du fichier :", err);
                    return res.status(500).json({ error: "Erreur de lecture du fichier" });
                }
                res.json(JSON.parse(data));
            });
        });

        // Route pour mettre à jour les données de la boutique
        app.put('/boutique', (req, res) => {
            const updateData = req.body;

            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error("Erreur de lecture du fichier :", err);
                    return res.status(500).json({ error: "Erreur de lecture du fichier" });
                }

                let existingData;
                try {
                    existingData = JSON.parse(data);
                } catch (parseError) {
                    console.error("Erreur de parsing du fichier JSON :", parseError);
                    return res.status(500).json({ error: "Erreur de parsing du fichier JSON" });
                }

                // Mettre à jour les informations de la boutique avec les nouvelles données
                const updatedData = {
                    ...existingData,
                    logoBoutique: existingData.logoBoutique,
                    nomBoutique: updateData.nomBoutique || existingData.nomBoutique,
                    sloganBoutique: updateData.sloganBoutique || existingData.sloganBoutique,
                    adresseBoutique: updateData.adresseBoutique || existingData.adresseBoutique,
                    ville: updateData.ville || existingData.ville,
                    pays: updateData.pays || existingData.pays,
                    codePostal: updateData.codePostal || existingData.codePostal,
                    contactBoutique: updateData.contactBoutique || existingData.contactBoutique,
                    emailBoutique: updateData.emailBoutique || existingData.emailBoutique,
                    monnaie: updateData.monnaie || existingData.monnaie
                };

                // Écrire les modifications dans le fichier JSON
                fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), (writeErr) => {
                    if (writeErr) {
                        console.error("Erreur lors de la sauvegarde des modifications :", writeErr);
                        return res.status(500).json({ error: "Erreur lors de la sauvegarde des modifications" });
                    }
                    res.json({ message: "Les informations de la boutique ont été mises à jour avec succès !" });
                });
            });
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

dbConnection()




app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})