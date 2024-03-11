import React, { useState, useEffect } from 'react'
import { API_URL } from '../../components/constantes'
// import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BiX, BiPencil } from "react-icons/bi";


// const iconbtnedit = {
//   color: '#4154f1',
//   backgroundColor: '#f6f9ff',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   borderRadius: '50%',
//   width: '1.2rem',
//   height: '1.2rem',
//   border: 'white',
//   fontSize: '3.5rem',
// }

// const iconbtndelete = {
//   color: '#e63333',
//   backgroundColor: '#FBE4E4',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   borderRadius: '50%',
//   width: '1.2rem',
//   height: '1.2rem',
//   border: 'white',
//   fontSize: '3.5rem',
// }

// const btnStyles = {
//   margin: '5px'
// }


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
    <>
    </>
  )
}

export default Incidents