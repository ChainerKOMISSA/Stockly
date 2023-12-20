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

function Suppliers() {

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/suppliers`)
      .then(response => response.json())
      .then(data => {
        setSuppliers(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des fournisseurs: ', error)
      })
  }, []);

  return (
    <div id="main" class="main">
      <div class="pagetitle">
        <h1>Liste des fournisseurs</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Acceuil</a></li>
            <li class="breadcrumb-item active">Liste des fournisseurs</li>
          </ol>
        </nav>
      </div>
      <section class="products">
        <div class="card">
          <div class="card-body">
            <div class="card-toolbar">
              <Link to="/newsupplier">
                <Button variant='primary' style={btnStyles}>Ajouter un fournisseurs</Button>
              </Link>
              <Link>
                <Button variant='outline-primary' style={btnStyles}>Imprimer la liste des fournisseurs</Button>
              </Link>
            </div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Adresse</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  suppliers.map(supplier => (
                    <tr key={supplier.Id_Frs}>
                      <th scope="row">{supplier.Id_Frs}</th>
                      <td>{supplier.Nom_Frs}</td>
                      <td>{supplier.Contact_Frs}</td>
                      <td>{supplier.Adresse_Frs}</td>
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

export default Suppliers