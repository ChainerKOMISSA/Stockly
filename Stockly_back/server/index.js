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

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

dbConnection()








// Routes pour l'authentification
app.post('/login', (req, res) => {
    res.json({ message: "Login" })
})



// Routes pour les stats
app.get('/statproduct', (req, res) => {
    const sql = 'SELECT COUNT(Id_Produit) as nbProd FROM produit'
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
})

app.get('/statorder', (req, res) => {
    const sql = 'SELECT COUNT(Id_Commande) as nbOrders FROM commande'
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
})

app.get('/statfrs', (req, res) => {
    const sql = 'SELECT COUNT(Id_Frs) as nbFrs FROM fournisseur'
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
})

app.get('/statemploye', (req, res) => {
    const sql = 'SELECT COUNT(id) as nbEmployes FROM employe'
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
})

app.get('/statrupture', (req, res) => {
    const sql = 'SELECT COUNT(Id_Produit) as NbRupture FROM produit WHERE Quantite_stock < 6'
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
})


app.get('/rupture', (req, res) => {
    const sql = `SELECT p.Id_Produit, p.Nom_Produit, p.Prix_Produit, p.Quantite_stock, p.Date_Peremption, c.Libelle_Categorie 
    FROM produit p 
    JOIN categorie c ON c.Id_Categorie = p.Id_Categorie 
    WHERE p.Quantite_stock < 6`
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
})


app.get('/peremption', (req, res) => {
    const sql = `SELECT p.Id_Produit, p.Nom_Produit, p.Prix_Produit, p.Quantite_stock, p.Date_Peremption, c.Libelle_Categorie
    FROM produit p 
    JOIN categorie c ON c.Id_Categorie = p.Id_Categorie 
    WHERE DATEDIFF(Date_Peremption, NOW()) <= 180`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});


app.get('/statsales', (req, res) => {
    const sql = 'SELECT SUM(Montant_Vente) as SumVente FROM vente'
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
})

app.get('/statdepenses', (req, res) => {
    const sql = 'SELECT SUM(Montant_Depense) as SumDepense FROM depense'
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
})



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})