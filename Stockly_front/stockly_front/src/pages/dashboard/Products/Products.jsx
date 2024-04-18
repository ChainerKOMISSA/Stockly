import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../../../components/constantes'
import { createSuccessAlert, failureAlert, updateSuccessAlert, deleteSuccessAlert } from '../../../components/alerts'
import { getCurrentDate } from '../../../helpers/CalendarControl'
import { formatDate } from '../../../helpers/DateFormat'
import Swal from 'sweetalert2'

function Products() {
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [showcreateModal, setShowCreateModal] = useState(false);
  const [showupdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null)

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
      const response = await fetch(`${API_URL}/produits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        createSuccessAlert();
        navigate(0)
      } else {
        const errorData = await response.json();
        failureAlert(errorData)
      }
    } catch (error) {
      failureAlert(error);
    }
  }

  function confirmDelete(id) {
    Swal.fire({
      title: "Etes-vous sûr de supprimer?",
      text: "Cette action est irréversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, supprimer"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  }


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/produits/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        deleteSuccessAlert()
        navigate(0)
      } else {
        const errorData = await response.json();
        failureAlert(errorData)
      }
    } catch (error) {
      failureAlert(error);
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
        nom: selectedProduct.nom,
        prix: selectedProduct.prix,
        quantiteStock: selectedProduct.quantiteStock,
        datePeremption: selectedProduct.datePeremption,
      });
    }
  }, [selectedProduct]);

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/produits/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const data = await response.json();
        updateSuccessAlert()
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
    fetch(`${API_URL}/produits`)
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
      <div id="kt_app_toolbar" className="app-toolbar pt-7 pt-lg-10">
        <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
          <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7">
              <li className="breadcrumb-item text-gray-700 fw-bold lh-1 mx-n1">
                <a href="index.html" className="text-hover-primary">
                  <i className="ki-outline ki-home text-gray-700 fs-6"></i>
                </a>
              </li>
              <li className="breadcrumb-item">
                <i className="ki-outline ki-right fs-7 text-gray-700"></i>
              </li>
              <li className="breadcrumb-item text-gray-700 fw-bold lh-1 mx-n1">Accueil</li>
              <li className="breadcrumb-item">
                <i className="ki-outline ki-right fs-7 text-gray-700"></i>
              </li>
              <li className="breadcrumb-item text-gray-500 mx-n1">Produits</li>
            </ul>
            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Liste des produits</h1>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content">
        <div class="card card-flush pb-0 bgi-position-y-center bgi-no-repeat mb-10" style={{ backgroundSize: "auto calc(100% + 10rem)", backgroundPositionX: "100%" }}>
          <div class="card-header pt-10">
            <div class="d-flex align-items-center">
              <div class="symbol symbol-circle me-5"></div>
              <div class="d-flex flex-column">
                <h2 class="mb-1">Filtre de recherche de produits</h2>
                <div class="text-muted">Effectuer une rechercher par ...</div> <br />
                <div className='row'>
                  <div className='col'>
                    <select id="kt_ecommerce_select2_country" className="form-select form-select-solid" data-kt-ecommerce-settings-type="select2_flags" data-placeholder="Catégorie" name='idCategorie'>
                      <option value="">Catégorie</option>
                      {
                        categories.map((categorie, index) => (
                          <option key={index} value={categorie.id}>{categorie.libelle}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='col'>
                    <select id="kt_ecommerce_select2_country" className="form-select form-select-solid" data-kt-ecommerce-settings-type="select2_flags" data-placeholder="Catégorie" name='idCategorie'>
                      <option value="">Produits</option>
                      {
                        produits.map((produit, index) => (
                          <option key={index} value={produit.id}>{produit.nom}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='col'>
                    <a href="#" className="btn btn-sm btn-light-primary">
                      <i className="ki-outline ki-magnifier fs-2"></i>
                      Rechercher
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body pb-0"></div>
        </div>
        <div className="card mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            {/* <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">Members Statistics</span>
              <span className="text-muted mt-1 fw-semibold fs-7">Over 500 members</span>
            </h3> */}
            <div className="card-toolbar align-items-center gap-2 gap-lg-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to add a user">
              <a href="#" className="btn btn-sm btn-light btn-active-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_share_earn" onClick={() => opencreateModal()}>
                <i className="ki-outline ki-plus fs-2"></i>
                Nouveau produit
              </a>

              <a href="#" className="btn btn-sm btn-light-primary">
                <i className="ki-outline ki-printer fs-2"></i>
                Exporter
              </a>
            </div>
          </div>
          <div className="card-body py-3">
            <div className="table-responsive">
              <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                <thead>
                  <tr className="fw-bold text-muted">
                    <th className="w-25px">
                      <div className="form-check form-check-sm form-check-custom form-check-solid">
                        <input className="form-check-input" type="checkbox" value="1" data-kt-check="true" data-kt-check-target=".widget-9-check" />
                      </div>
                    </th>
                    <th className="min-w-200px">Catégorie</th>
                    <th className="min-w-300px">Produit</th>
                    <th className="min-w-100px">Prix</th>
                    <th className="min-w-100px">Quantité</th>
                    <th className="min-w-100px">Péremption</th>
                    <th className="min-w-100px text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    produits.map((produit, index) => (
                      <tr key={index}>
                        <td>
                          <div className="form-check form-check-sm form-check-custom form-check-solid">
                            <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="d-flex justify-content-start flex-column">
                              <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">{produit.Categorie.libelle}</a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">{produit.nom}</a>
                        </td>
                        <td className="text-end">
                          <div className="d-flex flex-column w-100 me-2">
                            <div className="d-flex flex-stack mb-2">
                              <span className="text-gray-700 fw-bold text-hover-primary d-block fs-6">{produit.prix}</span>
                            </div>
                            {/* <div className="progress h-6px w-100">
                              <div className="progress-bar bg-primary" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                            </div> */}
                          </div>
                        </td>
                        <td className="text-end">
                          <div className="d-flex flex-column w-100 me-2">
                            <div className="d-flex flex-stack mb-2">
                              <span className="text-gray-700 fw-bold text-hover-primary d-block fs-6">{produit.quantiteStock}</span>
                            </div>
                          </div>
                        </td>
                        <td className="text-end">
                          <div className="d-flex flex-column w-100 me-2">
                            <div className="d-flex flex-stack mb-2">
                              <span className="text-gray-700 fw-bold text-hover-primary d-block fs-6">{formatDate(produit.datePeremption)}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex justify-content-end flex-shrink-0">
                            {/* <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                          <i className="ki-outline ki-file fs-2"></i>
                        </a> */}
                            <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" data-bs-toggle="modal" data-bs-target="#kt_modal_edit" onClick={() => openupdateModal(produit.id)}>
                              <i className="ki-outline ki-pencil fs-2"></i>
                            </a>
                            <a href="#" className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm" onClick={(e) => confirmDelete(produit.id)}>
                              <i className="ki-outline ki-trash fs-2"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {/* Create Product Modal */}
              <div className="modal fade" id="kt_modal_share_earn" tabIndex="-1" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered mw-900px">
                  <div className="modal-content">
                    <div className="modal-header pb-0 border-0 justify-content-end">
                      <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                        <i className="ki-outline ki-cross fs-1"></i>
                      </div>
                    </div>
                    <div className="modal-body scroll-y pt-0 pb-15">
                      <div className="mw-lg-700px mx-auto">
                        <div className="mb-13 text-center">
                          <h1 className="mb-3">Ajouter un produit</h1>
                          <div className="text-muted fw-semibold fs-5">Entrez les informations pour ajouter le produit.
                          </div>
                        </div>
                        <form id="kt_ecommerce_settings_general_form" className="form">
                          <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Catégorie du produit</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Choisissez une catégorie">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <div className="w-100">
                                  <select id="kt_ecommerce_select2_country" className="form-select form-select-solid" data-kt-ecommerce-settings-type="select2_flags" data-placeholder="Sélectionnez..." onChange={handleChange} name='idCategorie'>
                                    <option value="">Sélectionnez...</option>
                                    {
                                      categories.map((categorie, index) => (
                                        <option key={index} value={categorie.id}>{categorie.libelle}</option>
                                      ))
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Nom du produit</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le nom du produit">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="text" className="form-control form-control-solid" name="nom" value={formData.nom} onChange={handleChange} />
                              </div>
                            </div>
                          </div>
                          <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Prix du produit</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le prix du produit">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="number" className="form-control form-control-solid" name="prix" value={formData.prix} onChange={handleChange} />
                              </div>
                            </div>
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Quantité ajoutée</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez la quantité à ajouter">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="number" min={0} className="form-control form-control-solid" name="quantiteStock" value={formData.quantiteStock} onChange={handleChange} />
                              </div>
                            </div>
                          </div>
                          <div className="fv-row mb-7">
                            <label className="fs-6 fw-semibold form-label mt-3">
                              <span className="required">Date de péremption</span>
                              <span className="ms-1" data-bs-toggle="tooltip" title="Entrez la date de péremption">
                                <i className="ki-outline ki-information fs-7"></i>
                              </span>
                            </label>
                            <input type="date" min={getCurrentDate()} className="form-control form-control-solid" name="datePeremption" value={formData.datePeremption} onChange={handleChange} />
                          </div>
                          <div class="separator mb-6"></div>
                          <div class="d-flex justify-content-end">
                            <button type="reset" data-kt-contacts-type="cancel" class="btn btn-light me-3">Annuler</button>
                            <button class="btn btn-primary" onClick={handleSubmit}>
                              <span class="indicator-label">Enregistrer</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              {/* End Create Product Modal */}

              {/* Edit Product Modal */}
              {
                selectedProduct && (
                  <div className="modal fade" id="kt_modal_edit" tabIndex="-1" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered mw-800px">
                      <div className="modal-content">
                        <div className="modal-header pb-0 border-0 justify-content-end">
                          <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                            <i className="ki-outline ki-cross fs-1"></i>
                          </div>
                        </div>
                        <div className="modal-body scroll-y pt-0 pb-15">
                          <div className="mw-lg-600px mx-auto">
                            <div className="mb-13 text-center">
                              <h1 className="mb-3">Modifier le produit</h1>
                              <div className="text-muted fw-semibold fs-5">Modifier les informations du produit sélectionné.
                              </div>
                            </div>
                            <form id="kt_ecommerce_settings_general_form" className="form">
                              <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                                <div className="col">
                                  <div className="fv-row mb-7">
                                    <label className="fs-6 fw-semibold form-label mt-3">
                                      <span className="required">Catégorie du produit</span>
                                      <span className="ms-1" data-bs-toggle="tooltip" title="Choisissez une catégorie">
                                        <i className="ki-outline ki-information fs-7"></i>
                                      </span>
                                    </label>
                                    <div className="w-100">
                                      <select id="kt_ecommerce_select2_country" className="form-select form-select-solid" data-kt-ecommerce-settings-type="select2_flags" data-placeholder="Sélectionnez..." onChange={handleUpdateChange} name='idCategorie' value={updatedData.idCategorie}>
                                        <option value="">Sélectionnez...</option>
                                        {
                                          categories.map((categorie, index) => (
                                            <option key={index} value={categorie.id}>{categorie.libelle}</option>
                                          ))
                                        }
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="fv-row mb-7">
                                    <label className="fs-6 fw-semibold form-label mt-3">
                                      <span className="required">Nom du produit</span>
                                      <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le nom du produit">
                                        <i className="ki-outline ki-information fs-7"></i>
                                      </span>
                                    </label>
                                    <input type="text" className="form-control form-control-solid" name="nom" value={updatedData.nom} onChange={handleUpdateChange} />
                                  </div>
                                </div>
                              </div>
                              <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                                <div className="col">
                                  <div className="fv-row mb-7">
                                    <label className="fs-6 fw-semibold form-label mt-3">
                                      <span className="required">Prix du produit</span>
                                      <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le prix du produit">
                                        <i className="ki-outline ki-information fs-7"></i>
                                      </span>
                                    </label>
                                    <input type="number" className="form-control form-control-solid" name="prix" value={updatedData.prix} onChange={handleUpdateChange} />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="fv-row mb-7">
                                    <label className="fs-6 fw-semibold form-label mt-3">
                                      <span className="required">Quantité ajoutée</span>
                                      <span className="ms-1" data-bs-toggle="tooltip" title="Entrez la quantité à ajouter">
                                        <i className="ki-outline ki-information fs-7"></i>
                                      </span>
                                    </label>
                                    <input type="number" className="form-control form-control-solid" name="quantiteStock" value={updatedData.quantiteStock} onChange={handleUpdateChange} />
                                  </div>
                                </div>
                              </div>
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Date de péremption</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez la date de péremption">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="date" className="form-control form-control-solid" name="datePeremption" value={updatedData.datePeremption} onChange={handleUpdateChange} />
                              </div>
                              <div class="separator mb-6"></div>
                              <div class="d-flex justify-content-end">
                                <button type="reset" data-kt-contacts-type="cancel" class="btn btn-light me-3">Annuler</button>
                                <button class="btn btn-primary">
                                  <span class="indicator-label" onClick={handleUpdate}>Enregistrer les modifications</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )
              }

              {/* End Edit Product Modal */}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products