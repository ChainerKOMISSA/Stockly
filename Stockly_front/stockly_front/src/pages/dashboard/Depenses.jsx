import React, { useState, useEffect } from 'react'
import { API_URL } from '../../components/constantes';
// import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BiX, BiPencil } from "react-icons/bi";



function Depenses() {

  const [depenses, setDepenses] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/depenses`)
      .then(response => response.json())
      .then(data => {
        setDepenses(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des dépenses: ', error)
      })
  }, []);


  return (
    <>
    </>
  )
}

export default Depenses