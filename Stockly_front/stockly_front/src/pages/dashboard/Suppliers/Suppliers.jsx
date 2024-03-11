import React, { useState, useEffect } from 'react'
import { API_URL } from '../../../components/constantes'
// import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BiX, BiPencil } from "react-icons/bi";


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
    <>
    </>
  )
}

export default Suppliers