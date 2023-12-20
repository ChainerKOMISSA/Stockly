import React, { useState, useEffect } from 'react'
import { API_URL } from '../../../components/constantes'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BiX, BiPencil } from "react-icons/bi";

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

const btnStyles = {
  margin: '5px'
}


function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/orders`)
      .then(response => response.json())
      .then(data => {
        setOrders(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des commandes: ', error)
      })
  }, []);

  return (
    <div id="main" class="main">
      <div class="pagetitle">
        <h1>Liste des commandes</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Acceuil</a></li>
            <li class="breadcrumb-item active">Liste des commandes</li>
          </ol>
        </nav>
      </div>
      <section class="products">
        <div class="card">
          <div class="card-body">
            <div class="card-toolbar">
              <Link to="/neworder">
                <Button variant='primary' style={btnStyles}>Enregistrer une commande</Button>
              </Link>
              <Link>
                <Button variant='outline-primary' style={btnStyles}>Imprimer la liste des commandes</Button>
              </Link>
            </div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Produit</th>
                  <th scope="col">Fournisseur</th>
                  <th scope="col">Prix</th>
                  <th scope="col">Quantité</th>
                  <th scope="col">Montant</th>
                  <th scope="col">Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  orders.map(order => (
                    <tr key={order.Id_Commande}>
                      <th scope="row">{order.Id_Commande}</th>
                      <td>{order.Nom_Produit}</td>
                      <td>{order.Nom_Frs}</td>
                      <td>{order.Prix_Achat}</td>
                      <td>{order.Quantite_Cmd}</td>
                      <td>{order.Montant_Cmd}</td>
                      <td>{order.Date_Cmd}</td>
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
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Orders