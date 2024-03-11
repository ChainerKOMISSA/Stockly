import React, { useEffect, useState } from 'react'
// import { Button, Form, Modal, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../../../components/constantes'
import { BiX, BiPencil } from "react-icons/bi";
import { createSuccessAlert, failureAlert, updateSuccessAlert, deleteSuccessAlert } from '../../../components/alerts'



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
    <>
      <div id="kt_app_toolbar" class="app-toolbar pt-7 pt-lg-10">
        <div class="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
          <div class="page-title d-flex flex-column justify-content-center gap-1 me-3">
            <ul class="breadcrumb breadcrumb-separatorless fw-semibold fs-7">
              <li class="breadcrumb-item text-gray-700 fw-bold lh-1 mx-n1">
                <a href="index.html" class="text-hover-primary">
                  <i class="ki-outline ki-home text-gray-700 fs-6"></i>
                </a>
              </li>
              <li class="breadcrumb-item">
                <i class="ki-outline ki-right fs-7 text-gray-700"></i>
              </li>
              <li class="breadcrumb-item text-gray-700 fw-bold lh-1 mx-n1">Accueil</li>
              <li class="breadcrumb-item">
                <i class="ki-outline ki-right fs-7 text-gray-700"></i>
              </li>
              <li class="breadcrumb-item text-gray-500 mx-n1">Produits</li>
            </ul>
            <h1 class="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Liste des produits</h1>
          </div>
        </div>
      </div>

      <div id="kt_app_content" class="app-content">
        <div class="card mb-5 mb-xl-8">
          <div class="card-header border-0 pt-5">
            {/* <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bold fs-3 mb-1">Members Statistics</span>
              <span class="text-muted mt-1 fw-semibold fs-7">Over 500 members</span>
            </h3> */}
            <div class="card-toolbar align-items-center gap-2 gap-lg-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to add a user">
              <a href="#" class="btn btn-sm btn-light btn-active-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_invite_friends">
                <i class="ki-outline ki-plus fs-2"></i>
                Nouveau produit
              </a>

              <a href="#" class="btn btn-sm btn-light-primary">
                <i class="ki-outline ki-printer fs-2"></i>
                Exporter
              </a>

            </div>
          </div>
          <div class="card-body py-3">
            <div class="table-responsive">
              <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                <thead>
                  <tr class="fw-bold text-muted">
                    <th class="w-25px">
                      <div class="form-check form-check-sm form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" value="1" data-kt-check="true" data-kt-check-target=".widget-9-check" />
                      </div>
                    </th>
                    <th class="min-w-150px">Catégorie</th>
                    <th class="min-w-200px">Produit</th>
                    <th class="min-w-150px">Prix</th>
                    <th class="min-w-150px">Quantité en stock</th>
                    <th class="min-w-150px">Péremption</th>
                    <th class="min-w-100px text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    produits.map((produit, index) => (
                      <tr key={index}>
                        <td>
                          <div class="form-check form-check-sm form-check-custom form-check-solid">
                            <input class="form-check-input widget-9-check" type="checkbox" value="1" />
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center">
                            <div class="d-flex justify-content-start flex-column">
                              <a href="#" class="text-gray-900 fw-bold text-hover-primary fs-6">{produit.Libelle_Categorie}</a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <a href="#" class="text-gray-900 fw-bold text-hover-primary fs-6">{produit.Nom_Produit}</a>
                        </td>
                        <td class="text-end">
                          <div class="d-flex flex-column w-100 me-2">
                            <div class="d-flex flex-stack mb-2">
                              <span class="text-gray-500 fw-bold text-hover-primary d-block fs-6">{produit.Prix_Produit}</span>
                            </div>
                            {/* <div class="progress h-6px w-100">
                              <div class="progress-bar bg-primary" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                            </div> */}
                          </div>
                        </td>
                        <td>
                          <div class="d-flex justify-content-end flex-shrink-0">
                            {/* <a href="#" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                          <i class="ki-outline ki-file fs-2"></i>
                        </a> */}
                            <a href="#" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                              <i class="ki-outline ki-pencil fs-2"></i>
                            </a>
                            <a href="#" class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
                              <i class="ki-outline ki-trash fs-2"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products