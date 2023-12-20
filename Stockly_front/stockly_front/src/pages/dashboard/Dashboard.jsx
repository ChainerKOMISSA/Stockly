import React, { useState, useEffect } from 'react'
import '../styles/dashboard.css'
import { Card, Row, Col } from 'react-bootstrap'
import { BiCloudLightning, BiMoney, BiMoneyWithdraw, BiInfoCircle, BiPurchaseTagAlt, BiBuilding, BiUser, BiNotepad, BiCube } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { API_URL } from '../../components/constantes';


const cardStyles = {
  width: '3rem',
  height: '3rem',
  backgroundColor: '#f6f9ff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  fontSize: '2.5rem',
  padding: '0.5rem',
  border: 'white'
}

const cardStyles2 = {
  width: '3rem',
  height: '3rem',
  backgroundColor: '#FBE4E4',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  fontSize: '2.5rem',
  padding: '0.5rem',
  border: 'white'
}

const iconStyles = {
  color: '#4154f1',
}

const iconStyles2 = {
  color: '#e63333',
}

const titlestyle = {
  fontSize: '18px',
  color: '#012970',
  fontWeight: '600',
  margin: 0,
  padding: 0,
}

const cardgeneral = {
  width: '17rem',
  border: 'white',
  borderRadius: '5px',
  boxShadow: '0px 0 30px rgba(1, 41, 112, 0.1)'
}



function Dashboard() {
  const [nbproducts, setNbproducts] = useState([]);
  const [nborders, setOrders] = useState([]);
  const [nbrupture, setNbrupture] = useState([]);
  const [nbfrs, setFrs] = useState([]);
  const [nbemployes, setNbEmployes] = useState([]);
  const [sumdepenses, setSumdepenses] = useState([]);
  const [sumventes, setSumventes] = useState([]);


  //Nombre de produits
  useEffect(() => {
    fetch(`${API_URL}/statproduct`)
      .then(response => response.json())
      .then(data => {
        setNbproducts(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques des produits: ', error)
      })
  });


  //Nombre de commandes
  useEffect(() => {
    fetch(`${API_URL}/statorder`)
      .then(response => response.json())
      .then(data => {
        setOrders(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques des commandes: ', error)
      })
  });


  // Somme des ventes
  useEffect(() => {
    fetch(`${API_URL}/statsales`)
      .then(response => response.json())
      .then(data => {
        setSumventes(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques des ventes: ', error)
      })
  });


  // Nombre de rupture de stock
  useEffect(() => {
    fetch(`${API_URL}/statrupture`)
      .then(response => response.json())
      .then(data => {
        setNbrupture(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques des ruptures de stock: ', error)
      })
  });


  // Somme des dépenses
  useEffect(() => {
    fetch(`${API_URL}/statdepenses`)
      .then(response => response.json())
      .then(data => {
        setSumdepenses(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques des dépenses: ', error)
      })
  });

  // Nombre de fournisseurs
  useEffect(() => {
    fetch(`${API_URL}/statfrs`)
      .then(response => response.json())
      .then(data => {
        setFrs(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques des fournisseurs: ', error)
      })
  });

  // Nombre d'employés
  useEffect(() => {
    fetch(`${API_URL}/statemploye`)
      .then(response => response.json())
      .then(data => {
        setNbEmployes(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques des employés: ', error)
      })
  });



  return (
    <div id="main" class="main">
      <div class="pagetitle">
        <h1>Tableau de bord</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Acceuil</a></li>
            <li class="breadcrumb-item active">Tableau de bord</li>
          </ol>
        </nav>
      </div>
      <section class="dashboard">
        <Row>
          <Col>
            <Link style={{ textDecoration: 'none' }} to='/products'>
              <Card style={cardgeneral} id='card' >
                <Card.Body>
                  <Card.Subtitle className="mb-2" style={titlestyle}>Produits en stock</Card.Subtitle>
                  <Card.Text>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '20px' }}><b>{nbproducts.map(nbproduct => (nbproduct.nbProd))}</b></span>
                      <Card style={cardStyles}>
                        <BiCube style={iconStyles} size={25} />
                      </Card>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link style={{ textDecoration: 'none' }} to='/sales'>
              <Card style={cardgeneral} id='card'>
                <Card.Body>
                  <Card.Subtitle className="mb-2" style={titlestyle}>Ventes</Card.Subtitle>
                  <Card.Text>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '20px' }}><b>{sumventes.map(sumvente => (sumvente.SumVente))} F</b></span>
                      <Card style={cardStyles}>
                        <BiMoney style={iconStyles} size={25} />
                      </Card>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link style={{ textDecoration: 'none' }} to='/products'>
              <Card style={cardgeneral} id='card'>
                <Card.Body>
                  <Card.Subtitle className="mb-2" style={titlestyle}>Produits en rupture</Card.Subtitle>
                  <Card.Text>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '20px' }}><b>{nbrupture.map(nbrupt => (nbrupt.NbRupture))}</b></span>
                      <Card style={cardStyles2}>
                        <BiInfoCircle style={iconStyles2} size={25} />
                      </Card>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <Link style={{ textDecoration: 'none' }} to='/orders'>
              <Card style={cardgeneral} id='card'>
                <Card.Body>
                  <Card.Subtitle className="mb-2" style={titlestyle}>Commandes</Card.Subtitle>
                  <Card.Text>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '20px' }}><b>{nborders.map(nborder => (nborder.nbOrders))}</b></span>
                      <Card style={cardStyles}>
                        <BiPurchaseTagAlt style={iconStyles} size={25} />
                      </Card>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link style={{ textDecoration: 'none' }} to='/deliveries'>
              <Card style={cardgeneral} id='card'>
                <Card.Body>
                  <Card.Subtitle className="mb-2" style={titlestyle}>Livraisons</Card.Subtitle>
                  <Card.Text>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '20px' }}><b></b></span>
                      <Card style={cardStyles}>
                        <BiNotepad style={iconStyles} size={25} />
                      </Card>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link style={{ textDecoration: 'none' }} to='/depenses'>
              <Card style={cardgeneral} id='card'>
                <Card.Body>
                  <Card.Subtitle className="mb-2" style={titlestyle}>Dépenses</Card.Subtitle>
                  <Card.Text>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '20px' }}><b>{sumdepenses.map(sumdepense => (sumdepense.SumDepense))} F</b></span>
                      <Card style={cardStyles2}>
                        <BiMoneyWithdraw style={iconStyles2} size={25} />
                      </Card>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <Link style={{ textDecoration: 'none' }} to='/suppliers'>
              <Card style={cardgeneral} id='card'>
                <Card.Body>
                  <Card.Subtitle className="mb-2" style={titlestyle}>Fournisseurs</Card.Subtitle>
                  <Card.Text>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '20px' }}><b>{nbfrs.map(nbfr => (nbfr.nbFrs))}</b></span>
                      <Card style={cardStyles}>
                        <BiBuilding style={iconStyles} size={25} />
                      </Card>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link style={{ textDecoration: 'none' }} to='/employees'>
              <Card style={cardgeneral} id='card'>
                <Card.Body>
                  <Card.Subtitle className="mb-2" style={titlestyle}>Employés</Card.Subtitle>
                  <Card.Text>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '20px' }}><b>{nbemployes.map(nbemploye => (nbemploye.nbEmployes))}</b></span>
                      <Card style={cardStyles}>
                        <BiUser style={iconStyles} size={25} />
                      </Card>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link style={{ textDecoration: 'none' }} to='/incidents'>
              <Card style={cardgeneral} id='card'>
                <Card.Body>
                  <Card.Subtitle className="mb-2" style={titlestyle}>Incidents</Card.Subtitle>
                  <Card.Text>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '20px' }}><b></b></span>
                      <Card style={cardStyles2}>
                        <BiCloudLightning style={iconStyles2} size={25} />
                      </Card>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </section>

    </div>
  )
}

export default Dashboard