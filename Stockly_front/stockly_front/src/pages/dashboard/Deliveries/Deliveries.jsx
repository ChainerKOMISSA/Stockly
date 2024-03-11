import React, { useState, useEffect } from 'react'
import { API_URL } from '../../../components/constantes'
// import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BiX, BiPencil } from "react-icons/bi";




function Deliveries() {

  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/deliveries`)
      .then(response => response.json())
      .then(data => {
        setDeliveries(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des livraisons: ', error)
      })
  }, []);

  return (
    <>
    </>
  )
}

export default Deliveries