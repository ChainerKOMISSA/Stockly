import React, { useState, useEffect } from 'react'
import { API_URL } from '../../../components/constantes'
import { Button, Form, Modal, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { BiX, BiPencil } from "react-icons/bi";
import { createSuccessAlert, failureAlert, updateSuccessAlert, deleteSuccessAlert } from '../../../components/alerts'


const iconbtnedit = {
  color: '#4154f1',
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
    <div id="main" class="main">
      <div class="pagetitle">
        <h1>Liste des catégories</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Acceuil</a></li>
            <li class="breadcrumb-item active">Liste des catégories</li>
          </ol>
        </nav>
      </div>
      <section class="products">
        <div class="card">
          <div class="card-body">
            <div class="card-toolbar">
              <Link>
                <Button variant='primary' style={btnStyles} onClick={opencreateModal}>Ajouter une catégorie</Button>
              </Link>
              <Link>
                <Button variant='outline-primary' style={btnStyles}>Imprimer la liste des catégories</Button>
              </Link>
            </div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Libellé</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  categories.map((category, index) => (
                    <tr key={category.Id_Categorie}>
                      <th scope="row">{index += 1}</th>
                      <td>{category.Libelle_Categorie}</td>
                      <td>{category.Description_Categorie}</td>
                      <td>
                        <div class='row'>
                          <div class='col'>
                            <BiPencil style={iconbtnedit} onClick={() => openupdateModal(category)} />
                          </div>
                          <div class='col'>
                            <BiX style={iconbtndelete} onClick={() => handleDelete(category.Id_Categorie)} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <Modal show={showcreateModal} onHide={closecreateModal} centered size='lg'>
              <Modal.Header closeButton>
                <Modal.Title>Créer une nouvelle catégorie</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Libellé</Form.Label>
                        <Form.Control type="text" placeholder="Entrez le libellé" name='Libelle_Categorie' value={formData.Libelle_Categorie} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Entrez une description" name='Description_Categorie' value={formData.Description_Categorie} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='outline-secondary' onClick={closecreateModal}>Fermer</Button>
                <Button variant='primary' type='submit' onClick={handleSubmit}>Enregistrer</Button>
              </Modal.Footer>
            </Modal>

            {
              selectedCategory && (
                <Modal show={showupdateModal} onHide={closeupdateModal} centered size='lg'>
                  <Modal.Header closeButton>
                    <Modal.Title>Modifier la catégorie</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Libellé</Form.Label>
                            <Form.Control type="text" placeholder="Modifiez le libellé" name='Libelle_Categorie' value={updatedData.Libelle_Categorie} onChange={handleUpdateChange} />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Modifiez une description" name='Description_Categorie' value={updatedData.Description_Categorie} onChange={handleUpdateChange} />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='outline-secondary' onClick={closeupdateModal}>Annuler</Button>
                    <Button variant='primary' type='submit' onClick={(e) => handleUpdate(e, selectedCategory.Id_Categorie)}>Enregistrer les modifications</Button>
                  </Modal.Footer>
                </Modal>
              )
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Categories