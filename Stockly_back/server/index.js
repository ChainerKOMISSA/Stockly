const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbstockly',
});

db.connect((error) => {
    if (error) {
        console.error('Erreur de connexion à MySQL: ', error + stack);
        return;
    }
    console.log('Connexion à MySQL réussie!');
})

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({ message: "Hello from server" });
})






// Routes pour la table Produit
app.post('/createproduct', (req, res) => {
    const {Nom_Produit, Prix_Produit, Id_Categorie, Date_Peremption, Quantite_stock} = req.body;
    const sql = 'INSERT INTO produit VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [Nom_Produit, Prix_Produit, Id_Categorie, Date_Peremption, Quantite_stock], (error, result) => {
        if(error)throw error;
        res.json(result);
    });
});

app.get('/products', (req, res) => {
    const sql = `SELECT p.Id_Produit, p.Nom_Produit, p.Prix_Produit, p.Quantite_stock, p.Date_Peremption, c.Libelle_Categorie
    FROM produit p 
    JOIN categorie c ON c.Id_Categorie = p.Id_Categorie`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.put('/products/:id', (req, res) => {
    const { Nom_Produit, Prix_Produit, Id_Categorie, Date_Peremption, Quantite_stock } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE produit SET Nom_Produit = ?, Prix_Produit = ?, Id_Categorie = ?, Date_Peremption = ?, Quantite_stock = ? WHERE id = ?';
    db.query(sql, [Nom_Produit, Prix_Produit, Id_Categorie, Date_Peremption, Quantite_stock, id], (err, result) => {
      if (error) throw error;
      res.json(result);
    });
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM produit WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (error) throw error;
      res.json(result);
    });
});





// Routes pour la table Catégorie

app.post('/createcategory', (req, res) => {
    const {Libelle_Categorie, Description_Categorie} = req.body;
    const sql = 'INSERT INTO categorie VALUES (?, ?)';
    db.query(sql, [Libelle_Categorie, Description_Categorie], (error, result) => {
        if(error)throw error;
        res.json(result);
    });
});

app.get('/categories', (req, res) => {
    const sql = `SELECT * FROM categorie`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.put('/categories/:id', (req, res) => {
    const { Libelle_Categorie, Description_Categorie } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE categorie SET Libelle_Categorie = ?, Description_Categorie = ? WHERE id = ?';
    db.query(sql, [Libelle_Categorie, Description_Categorie, id], (err, result) => {
      if (error) throw error;
      res.json(result);
    });
});

app.delete('/categories/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM categorie WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (error) throw error;
      res.json(result);
    });
});















app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})