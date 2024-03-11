import React, { useState, useEffect } from 'react'
// import { Card, Row, Col } from 'react-bootstrap'
import { BiCloudLightning, BiMoney, BiMoneyWithdraw, BiInfoCircle, BiPurchaseTagAlt, BiBuilding, BiUser, BiNotepad, BiCube } from "react-icons/bi";
import { IoIosCube, IoIosCash, IoIosInformationCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import { API_URL } from '../../components/constantes';



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
      <div id="kt_app_toolbar" class="app-toolbar pt-7 pt-lg-10">

      </div>

      <div id="kt_app_content" class="app-content">
        
      </div>
    </>
  )
}

export default Dashboard