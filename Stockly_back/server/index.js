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



// Routes pour l'authentification
app.post('/login', (req, res) => {
    res.json({message : "Login"})
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






// Routes pour la table Produit
app.post('/createproduct', (req, res) => {
    const { Nom_Produit, Prix_Produit, Id_Categorie, Date_Peremption, Quantite_stock } = req.body;
    const sql = 'INSERT INTO produit (Nom_Produit, Prix_Produit, Id_Categorie, Date_Peremption, Quantite_stock) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [Nom_Produit, Prix_Produit, Id_Categorie, Date_Peremption, Quantite_stock], (error, result) => {
        if (error) throw error;
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

app.put('/product/:id', (req, res) => {
    const { Nom_Produit, Prix_Produit, Id_Categorie, Date_Peremption, Quantite_stock } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE produit SET Nom_Produit = ?, Prix_Produit = ?, Id_Categorie = ?, Date_Peremption = ?, Quantite_stock = ? WHERE id = ?';
    db.query(sql, [Nom_Produit, Prix_Produit, Id_Categorie, Date_Peremption, Quantite_stock, id], (err, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.delete('/product/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM produit WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (error) throw error;
        res.json(result);
    });
});





// Routes pour la table Catégorie

app.post('/createcategory', (req, res) => {
    const { Libelle_Categorie, Description_Categorie } = req.body;
    const sql = 'INSERT INTO categorie (Libelle_Categorie, Description_Categorie) VALUES (?, ?)';
    db.query(sql, [Libelle_Categorie, Description_Categorie], (error, result) => {
        if (error) throw error;
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

app.put('/category/:id', (req, res) => {
    const { Libelle_Categorie, Description_Categorie } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE categorie SET Libelle_Categorie = ?, Description_Categorie = ? WHERE Id_Categorie = ?';
    db.query(sql, [Libelle_Categorie, Description_Categorie, id], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.delete('/category/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM categorie WHERE Id_Categorie = ?';
    db.query(sql, [id], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});






// Routes pour la table Fournisseur

app.post('/createsupplier', (req, res) => {
    const { Nom_Frs, Contact_Frs, Adresse_Frs } = req.body;
    const sql = 'INSERT INTO fournisseur VALUES (?, ?, ?)';
    db.query(sql, [Nom_Frs, Contact_Frs, Adresse_Frs], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.get('/suppliers', (req, res) => {
    const sql = `SELECT * FROM fournisseur`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.put('/supplier/:id', (req, res) => {
    const { Nom_Frs, Contact_Frs, Adresse_Frs } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE fournisseur SET Nom_Frs = ?, Contact_Frs = ?, Adresse_Frs = ? WHERE id = ?';
    db.query(sql, [Nom_Frs, Contact_Frs, Adresse_Frs, id], (err, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.delete('/supplier/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM fournisseur WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (error) throw error;
        res.json(result);
    });
});






// Routes pour la table Commande

app.post('/createorder', (req, res) => {
    const { Id_Produit, Id_Frs, Prix_Achat, Quantite_Cmd, Montant_Cmd, Date_Cmd } = req.body;
    const sql = 'INSERT INTO commande VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [Id_Produit, Id_Frs, Prix_Achat, Quantite_Cmd, Montant_Cmd, Date_Cmd], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.get('/orders', (req, res) => {
    const sql = `SELECT c.Id_Commande, p.Nom_Produit, f.Nom_Frs, c.Prix_Achat, c.Quantite_Cmd, c.Montant_Cmd, c.Date_Cmd
     FROM commande c JOIN produit p ON p.Id_Produit = c.Id_Produit
     JOIN fournisseur f ON f.Id_Frs = c.Id_Frs`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.put('/order/:id', (req, res) => {
    const { Id_Produit, Id_Frs, Prix_Achat, Quantite_Cmd, Montant_Cmd, Date_Cmd } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE commande SET Id_Produit = ?, Id_Frs = ?, Prix_Achat = ?, Quantite_Cmd = ?, Montant_Cmd = ?, Date_Cmd = ? WHERE id = ?';
    db.query(sql, [Id_Produit, Id_Frs, Prix_Achat, Quantite_Cmd, Montant_Cmd, Date_Cmd, id], (err, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.delete('/order/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM commande WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (error) throw error;
        res.json(result);
    });
});





// Routes pour la table Livraison

app.post('/createdelivery', (req, res) => {
    const { Id_Commande, Date_Livraison } = req.body;
    const sql = 'INSERT INTO livraison VALUES (?, ?)';
    db.query(sql, [Id_Commande, Date_Livraison], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.get('/deliveries', (req, res) => {
    const sql = `SELECT * FROM livraison`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.put('/delivery/:id', (req, res) => {
    const { Id_Commande, Date_Livraison } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE livraison SET Id_Commande = ?, Date_Livraison = ? WHERE id = ?';
    db.query(sql, [Id_Commande, Date_Livraison, id], (err, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.delete('/delivery/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM livraison WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (error) throw error;
        res.json(result);
    });
});





// Routes pour la table Incident
app.post('/createincident', (req, res) => {
    const { Libelle_Incid, Description_Incid, Date_Incid } = req.body;
    const sql = 'INSERT INTO incident VALUES (?, ?, ?)';
    db.query(sql, [Libelle_Incid, Description_Incid, Date_Incid], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.get('/incidents', (req, res) => {
    const sql = `SELECT * FROM incident`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.put('/incident/:id', (req, res) => {
    const { Libelle_Incid, Description_Incid, Date_Incid } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE incident SET Libelle_Incid = ?, Description_Incid = ?, Date_Incid = ? WHERE id = ?';
    db.query(sql, [Libelle_Incid, Description_Incid, Date_Incid, id], (err, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.delete('/incident/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM incident WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (error) throw error;
        res.json(result);
    });
});







// Routes pour la table Dépense
app.post('/createdepense', (req, res) => {
    const { Libelle_Depense, Montant_Depense, Date_Depense } = req.body;
    const sql = 'INSERT INTO depense VALUES (?, ?, ?)';
    db.query(sql, [Libelle_Depense, Montant_Depense, Date_Depense], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.get('/depenses', (req, res) => {
    const sql = `SELECT * FROM depense`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.put('/depense/:id', (req, res) => {
    const { Libelle_Depense, Montant_Depense, Date_Depense } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE depense SET Libelle_Depense = ?, Montant_Depense = ?, Date_Depense = ? WHERE id = ?';
    db.query(sql, [Libelle_Depense, Montant_Depense, Date_Depense, id], (err, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.delete('/depense/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM depense WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (error) throw error;
        res.json(result);
    });
});








// Routes pour la table Vente
app.post('/createsale', (req, res) => {
    const { Id_Produit, Prix_Vente, Quantite_Vente, Montant_Vente, Date_Vente } = req.body;
    const sql = 'INSERT INTO vente VALUES (?, ?, ?, ? ,?)';
    db.query(sql, [Id_Produit, Prix_Vente, Quantite_Vente, Montant_Vente, Date_Vente], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.get('/sales', (req, res) => {
    const sql = `SELECT v.Id_Vente, p.Nom_Produit, v.Prix_Vente, v.Quantite_Vente, v.Montant_Vente, v.Date_Vente 
    FROM vente v JOIN produit p ON p.Id_Produit = v.Id_Produit`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.put('/sale/:id', (req, res) => {
    const { Id_Produit, Prix_Vente, Quantite_Vente, Montant_Vente, Date_Vente } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE vente SET Id_Produit = ?, Prix_Vente = ?, Quantite_Vente = ?, Montant_Vente = ?, Date_Vente = ? WHERE id = ?';
    db.query(sql, [Id_Produit, Prix_Vente, Quantite_Vente, Montant_Vente, Date_Vente, id], (err, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.delete('/sale/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM vente WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (error) throw error;
        res.json(result);
    });
});






// Routes pour la table Employe
app.post('/createemployee', (req, res) => {
    const { nom, prenom, contact } = req.body;
    const sql = 'INSERT INTO employe VALUES (?, ?, ?)';
    db.query(sql, [nom, prenom, contact], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employe`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.put('/employee/:id', (req, res) => {
    const { nom, prenom, contact } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE employe SET nom = ?, prenom = ?, contact = ? WHERE id = ?';
    db.query(sql, [nom, prenom, contact, id], (err, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.delete('/employee/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM employe WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (error) throw error;
        res.json(result);
    });
});






app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})