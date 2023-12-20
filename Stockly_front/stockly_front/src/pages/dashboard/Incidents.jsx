import React, { useState, useEffect } from 'react'
import { API_URL } from '../../components/constantes'
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


function Incidents() {
  const [incidents, setIncidents] = useState([]);


  useEffect(() => {
    fetch(`${API_URL}/incidents`)
      .then(response => response.json())
      .then(data => {
        setIncidents(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des incidents: ', error)
      })
  }, []);


  return (
    <div id="main" class="main">
      <div class="pagetitle">
        <h1>Liste des incidents</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Acceuil</a></li>
            <li class="breadcrumb-item active">Liste des incidents</li>
          </ol>
        </nav>
      </div>
      <section class="products">
        <div class="card">
          <div class="card-body">
            <div class="card-toolbar">
              <Link to="">
                <Button variant='primary' style={btnStyles}>Enregistrer un incident</Button>
              </Link>
              <Link>
                <Button variant='outline-primary' style={btnStyles}>Imprimer la liste des incidents</Button>
              </Link>
            </div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Libellé</th>
                  <th scope="col">Description</th>
                  <th scope="col">Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  incidents.map(incident => (
                    <tr key={incident.Id_Incid}>
                      <th scope="row">{incident.Id_Incid}</th>
                      <td>{incident.Libelle_Incid}</td>
                      <td>{incident.Description_Incid}</td>
                      <td>{incident.Date_Incid}</td>
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

export default Incidents