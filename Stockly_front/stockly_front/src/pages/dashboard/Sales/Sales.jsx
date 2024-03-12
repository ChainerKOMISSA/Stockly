import React, { useState, useEffect } from 'react'
import { API_URL } from '../../../components/constantes'
import { Link, useNavigate } from 'react-router-dom'
import { createSuccessAlert, failureAlert, updateSuccessAlert, deleteSuccessAlert } from '../../../components/alerts'
import { PriceInputControl, MontantInputControl } from '../../../helpers/InputControls'



function Sales() {
  const navigate = useNavigate()
  const [showcreateModal, setShowCreateModal] = useState(false);
  const [showupdateModal, setShowUpdateModal] = useState(false);
  const [sales, setSales] = useState([])
  const [produits, setProduits] = useState([])
  const [selectedSale, setSelectedSale] = useState(null)
  const [formData, setFormData] = useState({});
  const [updatedData, setUpdatedData] = useState({});

  const opencreateModal = () => { setShowCreateModal(true) }
  const closecreateModal = () => { setShowCreateModal(false) }

  const openupdateModal = (sale) => { setShowUpdateModal(true); setSelectedSale(sale) }
  const closeupdateModal = () => { setShowUpdateModal(false); setSelectedSale(null) }

  useEffect(() => {
    fetch(`${API_URL}/sales`)
      .then(response => response.json())
      .then(data => {
        setSales(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des ventes: ', error)
      })
  }, []);

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
      const response = await fetch(`${API_URL}/createsale`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        createSuccessAlert()
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
    if (selectedSale) {
      setUpdatedData({
        Id_Produit: selectedSale.Id_Produit,
        Prix_Vente: selectedSale.Prix_Vente,
        Quantite_Vente: selectedSale.Quantite_Vente,
        Montant_Vente: selectedSale.Montant_Vente,
        Date_Vente: selectedSale.Date_Vente,
      });
    }
  }, [selectedSale]);


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

  const addProductToList = () => {

  }

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
              <li className="breadcrumb-item text-gray-500 mx-n1">Ventes</li>
            </ul>
            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Liste des ventes</h1>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content">
        <div className="card mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            <div className="card-toolbar align-items-center gap-2 gap-lg-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to add a user">
              <a href="#" className="btn btn-sm btn-light btn-active-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_share_earn" onClick={() => opencreateModal()}>
                <i className="ki-outline ki-plus fs-2"></i>
                Nouvelle vente
              </a>
              <a href="#" className="btn btn-sm btn-light-primary">
                <i className="ki-outline ki-printer fs-2"></i>
                Exporter
              </a>
            </div>
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
                  <th className="min-w-200px">Date</th>
                  <th className="min-w-150px">Produit vendu</th>
                  <th className="min-w-200px">Prix</th>
                  <th className="min-w-200px">Quantité</th>
                  <th className="min-w-200px">Montant</th>
                  <th className="min-w-100px text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  sales.map((sale, index) => (
                    <tr key={index}>
                      <td>
                        <div className="form-check form-check-sm form-check-custom form-check-solid">
                          <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="d-flex justify-content-start flex-column">
                            <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">{sale.Date_Vente}</a>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a className="text-gray-900 fw-bold text-hover-primary fs-6">{sale.Nom_Produit}</a>
                      </td>
                      <td>
                        <a className="text-gray-900 fw-bold text-hover-primary fs-6">{sale.Prix_Vente}</a>
                      </td>
                      <td>
                        <a className="text-gray-900 fw-bold text-hover-primary fs-6">{sale.Quantite_Vente}</a>
                      </td>
                      <td>
                        <a className="text-gray-900 fw-bold text-hover-primary fs-6">{sale.Montant_Vente}</a>
                      </td>
                      <td>
                        <div className="d-flex justify-content-end flex-shrink-0">
                          <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" data-bs-toggle="modal" data-bs-target="#kt_modal_edit" onClick={() => openupdateModal(sale.Id_Vente)}>
                            <i className="ki-outline ki-pencil fs-2"></i>
                          </a>
                          <a href="#" className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm" onClick={() => handleDelete(sale.Id_Vente)}>
                            <i className="ki-outline ki-trash fs-2"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            {/* Create Category Modal */}
            <div className="modal fade" id="kt_modal_share_earn" tabindex="-1" aria-hidden="true" >
              <div className="modal-dialog modal-dialog-centered mw-1000px">
                <div className="modal-content">
                  <div className="modal-header pb-0 border-0 justify-content-end">
                    <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                      <i className="ki-outline ki-cross fs-1"></i>
                    </div>
                  </div>
                  <div className="modal-body scroll-y pt-0 pb-15">
                    <div className="mw-lg-900px mx-auto">
                      <div className="mb-13 text-center">
                        <h1 className="mb-3">Nouvelle vente</h1>
                        <div className="text-muted fw-semibold fs-5">Entrez les informations pour enregistrer la vente.
                        </div>
                      </div>
                      <form id="kt_ecommerce_settings_general_form" className="form">
                        <div className="fv-row mb-7">
                          <label className="fs-6 fw-semibold form-label mt-3">
                            <span className="required">Date</span>
                            <span className="ms-1" data-bs-toggle="tooltip" title="Entrez la date">
                              <i className="ki-outline ki-information fs-7"></i>
                            </span>
                          </label>
                          <input type="date" className="form-control form-control-solid" name="Date_Vente" value={formData.Date_Vente} onChange={handleChange} />
                        </div>
                        <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                          <div className="col">
                            <div className="fv-row mb-7">
                              <label className="fs-6 fw-semibold form-label mt-3">
                                <span className="required">Produit à vendre</span>
                                <span className="ms-1" data-bs-toggle="tooltip" title="Choisissez un produit">
                                  <i className="ki-outline ki-information fs-7"></i>
                                </span>
                              </label>
                              <div className="w-100">
                                <select id="kt_ecommerce_select2_country" className="form-select form-select-solid" data-kt-ecommerce-settings-type="select2_flags" data-placeholder="Sélectionnez..." onChange={handleChange} name='Id_Produit'>
                                  <option value="">Sélectionnez...</option>
                                  {
                                    produits.map((produit, index) => (
                                      <option key={index} value={produit.Id_Produit} data-prix={produit.Prix_Produit}>{produit.Nom_Produit}</option>
                                    ))
                                  }
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="fv-row mb-7">
                              <label className="fs-6 fw-semibold form-label mt-3">
                                <span className="required">Prix de vente</span>
                                <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le prix du produit">
                                  <i className="ki-outline ki-information fs-7"></i>
                                </span>
                              </label>
                              <input type="number" className="form-control form-control-solid" id='Prix_Vente' name="Prix_Vente" value={formData.Prix_Vente} onChange={handleChange} readOnly />
                            </div>
                          </div>
                        </div>
                        <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                          <div className="col">
                            <div className="fv-row mb-7">
                              <label className="fs-6 fw-semibold form-label mt-3">
                                <span className="required">Quantité vendue</span>
                                <span className="ms-1" data-bs-toggle="tooltip" title="Entrez la quantité vendue">
                                  <i className="ki-outline ki-information fs-7"></i>
                                </span>
                              </label>
                              <input type="number" min={0} className="form-control form-control-solid" name="Quantite_Vente" value={formData.Quantite_Vente} onChange={handleChange} />
                            </div>
                          </div>
                          <div className="col">
                            <div className="fv-row mb-7">
                              <label className="fs-6 fw-semibold form-label mt-3">
                                <span className="required">Montant total</span>
                                <span className="ms-1" data-bs-toggle="tooltip" title="Le montant s'affiche automatiquement">
                                  <i className="ki-outline ki-information fs-7"></i>
                                </span>
                              </label>
                              <input type="text" className="form-control form-control-solid" name="Montant_Vente" value={formData.Montant_Vente} onChange={handleChange} readOnly />
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end">
                          <button className="btn btn-primary">
                            <span className="indicator-label">Ajouter</span>
                          </button>
                        </div>

                        <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4" id="product_list_table">
                          <thead>
                            <tr className="fw-bold text-muted">
                              <th className="min-w-200px">Produit</th>
                              <th className="min-w-200px">Prix</th>
                              <th className="min-w-200px">Quantité</th>
                              <th className="min-w-200px">Montant</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Produit</td>
                              <td>Produit</td>
                              <td>Produit</td>
                              <td>Produit</td>
                            </tr>
                            <tr>
                              <td>Produit</td>
                              <td>Produit</td>
                              <td>Produit</td>
                              <td>Produit</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="d-flex justify-content-end" id="bill_button">
                          <span className="btn btn-light me-3 fw-semibold fs-5"><i className="ki-outline ki-basket fs-3"></i> Montant total à payer :  FCFA</span>
                        </div><br />
                        <div className="separator mb-6"></div>
                        <div className="d-flex justify-content-end">
                          <button type="reset" data-kt-contacts-type="cancel" className="btn btn-light me-3">Annuler</button>
                          <button className="btn btn-primary">
                            <span className="indicator-label" onClick={handleSubmit}>Enregistrer</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            {/* End Create Product Modal */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sales