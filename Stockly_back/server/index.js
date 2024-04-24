require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./src/models/database')

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
        app.use('/logs', logRouter)

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

dbConnection()









app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})