import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../../../components/constantes'
import { BiX, BiPencil } from "react-icons/bi";
import { createSuccessAlert, failureAlert, updateSuccessAlert, deleteSuccessAlert } from '../../../components/alerts'


const btnStyles = {
  margin: '5px'
}

const iconbtnedit = {
  color: '#4154f1',
  backgroundColor: '#f6f9ff',
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
  backgroundColor: '#FBE4E4',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  width: '1.2rem',
  height: '1.2rem',
  border: 'white',
  fontSize: '3.5rem',
}

function Products() {
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [showcreateModal, setShowCreateModal] = useState(false);
  const [showupdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [updatedData, setUpdatedData] = useState({});

  const opencreateModal = () => { setShowCreateModal(true) }
  const closecreateModal = () => { setShowCreateModal(false) }

  const openupdateModal = (product) => { setShowUpdateModal(true); setSelectedProduct(product) }
  const closeupdateModal = () => { setShowUpdateModal(false); setSelectedProduct(null) }


  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then(response => response.json())
      .then(data => {
        setCategories(data)
      })
      .catch(error => {
        console.log('Erreur lors de la récupération des catégories: ', error);
      })
  })

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
      const response = await fetch(`${API_URL}/createproduct`, {
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

  const handleDelete = (id) => {
    try {
      const response = fetch(`${API_URL}/product/${id}`, {
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

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  }

  useEffect(() => {
    if (selectedProduct) {
      setUpdatedData({
        Nom_Produit: selectedProduct.Nom_Produit,
        Prix_Produit: selectedProduct.Prix_Produit,
      });
    }
  }, [selectedProduct]);

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/product/${id}`, {
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


  useEffect(() => {

    fetch(`${API_URL}/products`)
      .then(response => response.json())
      .then(data => {
        setProduits(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des produits: ', error)
      })

  }, []);


  return (
    <div id="main" class="main">
      <div class="pagetitle">
        <h1>Liste des produits</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Acceuil</a></li>
            <li class="breadcrumb-item active">Liste des produits</li>
          </ol>
        </nav>
      </div>
      <section class="products">
        <div class="card">
          <div class="card-body">
            <div class="card-toolbar">
              <Link>
                <Button variant='primary' style={btnStyles} onClick={opencreateModal}>Ajouter un produit</Button>
              </Link>
              <Link>
                <Button variant='outline-primary' style={btnStyles}>Imprimer la liste des produits</Button>
              </Link>
            </div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Catégorie</th>
                  <th scope="col">Prix</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Péremption</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  produits.map(produit => (
                    <tr key={produit.Id_Produit}>
                      <th scope="row">{produit.Id_Produit}</th>
                      <td>{produit.Nom_Produit}</td>
                      <td>{produit.Libelle_Categorie}</td>
                      <td>{produit.Prix_Produit}</td>
                      <td>{produit.Quantite_stock}</td>
                      <td>{produit.Date_Peremption}</td>
                      <td>
                        <div class='row'>
                          <div class='col'>
                            <Link style={{ textDecoration: 'none' }}>
                              <BiPencil style={iconbtnedit} />
                            </Link>
                          </div>
                          <div class='col'>
                            <Link>
                              <BiX style={iconbtndelete} />
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Modal show={showcreateModal} onHide={closecreateModal} centered size='lg'>
              <Modal.Header closeButton>
                <Modal.Title>Enregistrer un nouveau produit</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Nom du produit</Form.Label>
                      <Form.Control type="text" placeholder="Entrez le nom du produit" name='Nom_Produit' value={formData.Nom_Produit} onChange={handleChange} />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Catégorie</Form.Label>
                        <Form.Select aria-label="Default select example" name='Id_Categorie' value={formData.Id_Categorie} onChange={handleChange}>
                          <option>Sélectionnez...</option>
                          {
                            categories.map(category => (
                              <option value={category.Id_Categorie}>{category.Libelle_Categorie}</option>
                            ))
                          }
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Prix du produit</Form.Label>
                        <Form.Control type="number" placeholder="Entrez le prix" name='Prix_Produit' value={formData.Prix_Produit} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Quantité à ajouter</Form.Label>
                        <Form.Control type="number" placeholder="Entrez la quantité" name='Quantite_stock' value={formData.Quantite_stock} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Date de péremption</Form.Label>
                        <Form.Control type="date" placeholder="Entrez la date" name='Date_Peremption' value={formData.Date_Peremption} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="secondary" type="reset" style={{ margin: '1%' }}>
                    Annuler
                  </Button>
                  <Button variant="primary" type="submit" onClick={handleSubmit} style={{ margin: '1%' }}>
                    Enregistrer
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='outline-secondary' onClick={closecreateModal}>Fermer</Button>
                <Button variant='primary' type='submit' onClick={handleSubmit}>Enregistrer</Button>
              </Modal.Footer>
            </Modal>

            {
              selectedProduct && (
                <Modal show={showupdateModal} onHide={closeupdateModal} centered size='lg'>
                  <Modal.Header closeButton>
                    <Modal.Title>Modifier le produit</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Row>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Nom du produit</Form.Label>
                          <Form.Control type="text" placeholder="Entrez le nom du produit" name='Nom_Produit' value={formData.Nom_Produit} onChange={handleChange} />
                        </Form.Group>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Catégorie</Form.Label>
                            <Form.Select aria-label="Default select example" name='Id_Categorie' value={formData.Id_Categorie} onChange={handleChange}>
                              <option>Sélectionnez...</option>
                              {
                                categories.map(category => (
                                  <option value={category.Id_Categorie}>{category.Libelle_Categorie}</option>
                                ))
                              }
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Prix du produit</Form.Label>
                            <Form.Control type="number" placeholder="Entrez le prix" name='Prix_Produit' value={formData.Prix_Produit} onChange={handleChange} />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Quantité à ajouter</Form.Label>
                            <Form.Control type="number" placeholder="Entrez la quantité" name='Quantite_stock' value={formData.Quantite_stock} onChange={handleChange} />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Date de péremption</Form.Label>
                            <Form.Control type="date" placeholder="Entrez la date" name='Date_Peremption' value={formData.Date_Peremption} onChange={handleChange} />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button variant="secondary" type="reset" style={{ margin: '1%' }}>
                        Annuler
                      </Button>
                      <Button variant="primary" type="submit" onClick={handleSubmit} style={{ margin: '1%' }}>
                        Enregistrer
                      </Button>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='outline-secondary' onClick={closeupdateModal}>Annuler</Button>
                    <Button variant='primary' type='submit' onClick={(e) => handleUpdate(e, selectedProduct.Id_Produit)}>Enregistrer les modifications</Button>
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

export default Products