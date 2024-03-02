import React, { useState, useEffect } from 'react'
// import '../styles/dashboard.css'
import { Card, Row, Col } from 'react-bootstrap'
import { BiCloudLightning, BiMoney, BiMoneyWithdraw, BiInfoCircle, BiPurchaseTagAlt, BiBuilding, BiUser, BiNotepad, BiCube } from "react-icons/bi";
import { IoIosCube, IoIosCash, IoIosInformationCircle } from "react-icons/io";
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
    <>
      <div id="kt_app_toolbar" className="app-toolbar pt-7 pt-lg-10">
        <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
          <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7">
              <li className="breadcrumb-item text-gray-700 fw-bold lh-1 mx-n1">
                <Link to={'/'} className="text-hover-primary">
                  <i className="ki-outline ki-home text-gray-700 fs-6"></i>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <i className="ki-outline ki-right fs-7 text-gray-700"></i>
              </li>
              <li className="breadcrumb-item text-gray-700 fw-bold lh-1 mx-n1">Accueil</li>
            </ul>
            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Tableau de bord</h1>
          </div>
        </div>
      </div>


      <div id="kt_app_content" className="app-content">

      </div>
    </>
  )
}

export default Dashboard