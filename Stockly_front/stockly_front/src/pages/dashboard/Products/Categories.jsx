import React, { useState, useEffect } from 'react'
import { API_URL } from '../../../components/constantes'
// import { Button, Form, Modal, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { BiX, BiPencil } from "react-icons/bi";
import { createSuccessAlert, failureAlert, updateSuccessAlert, deleteSuccessAlert } from '../../../components/alerts'



function Categories() {
  const navigate = useNavigate()
  const [showcreateModal, setShowCreateModal] = useState(false);
  const [showupdateModal, setShowUpdateModal] = useState(false);
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [formData, setFormData] = useState({});
  const [updatedData, setUpdatedData] = useState({});

  const opencreateModal = () => { setShowCreateModal(true) }
  const closecreateModal = () => { setShowCreateModal(false) }

  const openupdateModal = (category) => { setShowUpdateModal(true); setSelectedCategory(category) }
  const closeupdateModal = () => { setShowUpdateModal(false); setSelectedCategory(null) }


  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then(response => response.json())
      .then(data => {
        setCategories(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des catégories: ', error)
      })
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/createcategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        createSuccessAlert()
        closecreateModal();
        navigate(0)
      } else {
        const errorData = await response.json();
        failureAlert(errorData)
      }
    }
    catch (error) {
      failureAlert(error)
    }
  }

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  }

  useEffect(() => {
    if (selectedCategory) {
      setUpdatedData({
        Libelle_Categorie: selectedCategory.Libelle_Categorie,
        Description_Categorie: selectedCategory.Description_Categorie,
      });
    }
  }, [selectedCategory]);


  const handleUpdate = async (e, id) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/category/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const data = await response.json();
        updateSuccessAlert()
        closecreateModal();
        navigate(0)
      } else {
        const errorData = await response.json();
        failureAlert(errorData)
      }
    }
    catch (error) {
      failureAlert(error)
    }
  }


  const handleDelete = (id) => {
    try {
      const response = fetch(`${API_URL}/category/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = response.json();
        deleteSuccessAlert()
        navigate(0)
      } else {
        const errorData = response.json();
        failureAlert(errorData)
      }
    }
    catch (error) {
      failureAlert(error)
    }
  }

  return (
    <>
    </>
  )
}

export default Categories