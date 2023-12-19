import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API_URL } from '../../../components/constantes'
import { BiX, BiPencil } from "react-icons/bi";


const btnStyles = {
  margin: '5px'
}

const iconbtnedit = {
  color: '#4154f1',
  backgroundColor: '#f6f9ff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  width: '1.2rem',
  height: '1.2rem',
  border: 'white',
  fontSize: '3.5rem',
}

const iconbtndelete = {
  color: '#e63333',
  backgroundColor: '#FBE4E4',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  width: '1.2rem',
  height: '1.2rem',
  border: 'white',
  fontSize: '3.5rem',
}

function Products() {

  const [produits, setProduits] = useState([]);

  useEffect(() => {

    fetch(`${API_URL}/products`)
      .then(response => response.json())
      .then(data => {
        setProduits(data)
        //console.log(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des produits: ', error)
      })

  }, []);


  return (
    <div id="main" class="main">
      <div class="pagetitle">
        <h1>Liste des produits</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Acceuil</a></li>
            <li class="breadcrumb-item active">Liste des produits</li>
          </ol>
        </nav>
      </div>
      <section class="products">
        <div class="card">
          <div class="card-body">
            <div class="card-toolbar">
              <Link to="/addproduct">
                <Button variant='primary' style={btnStyles}>Ajouter un produit</Button>
              </Link>
              <Link>
                <Button variant='outline-primary' style={btnStyles}>Imprimer la liste des produits</Button>
              </Link>
            </div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Catégorie</th>
                  <th scope="col">Prix</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Péremption</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  produits.map(produit => (
                    <tr key={produit.Id_Produit}>
                      <th scope="row">{produit.Id_Produit}</th>
                      <td>{produit.Nom_Produit}</td>
                      <td>{produit.Libelle_Categorie}</td>
                      <td>{produit.Prix_Produit}</td>
                      <td>{produit.Quantite_stock}</td>
                      <td>{produit.Date_Peremption}</td>
                      <td>
                        <div class='row'>
                          <div class='col'>
                            <Link style={{ textDecoration: 'none' }}>
                              <BiPencil style={iconbtnedit} />
                            </Link>
                          </div>
                          <div class='col'>
                            <Link>
                              <BiX style={iconbtndelete} />
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Products