import React, { useState, useEffect } from 'react'
import { API_URL } from '../../../components/constantes'
// import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BiX, BiPencil } from "react-icons/bi";



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
    <>
    </>
  )
}

export default Orders