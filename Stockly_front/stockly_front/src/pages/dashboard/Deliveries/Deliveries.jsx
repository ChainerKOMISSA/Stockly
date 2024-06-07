import React, { useState, useEffect } from 'react'
import { API_URL } from '../../../components/constantes'
import { Link, useNavigate } from 'react-router-dom'
import { createSuccessAlert, failureAlert, updateSuccessAlert, deleteSuccessAlert } from '../../../components/alerts'
import { getCurrentDate } from '../../../helpers/CalendarControl'
import { formatDate } from '../../../helpers/DateFormat'
import Swal from 'sweetalert2'



function Deliveries() {
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [formData, setFormData] = useState({});
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/commandes`)
      .then(response => response.json())
      .then(data => {
        setOrders(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des commandes: ', error)
      })
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/livraisons`)
      .then(response => response.json())
      .then(data => {
        setDeliveries(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des livraisons: ', error)
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
      const response = await fetch(`${API_URL}/livraisons`, {
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
      const response = await fetch(`${API_URL}/livraisons/${id}`, {
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
    if (selectedDelivery) {
      setUpdatedData({
        dateLivraison: selectedDelivery.dateLivraison,
        idCommande: selectedDelivery.idCommande
      });
    }
  }, [selectedDelivery]);


  const handleUpdate = async (e, id) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/livraisons/${id}`, {
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
              <li className="breadcrumb-item text-gray-500 mx-n1">Livraisons</li>
            </ul>
            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Liste des livraisons</h1>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content">
        <div className="card mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            <div className="card-toolbar align-items-center gap-2 gap-lg-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to add a user">
              {/* <a href="#" className="btn btn-sm btn-light btn-active-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_share_earn">
                <i className="ki-outline ki-plus fs-2"></i>
                Nouvelle livraison
              </a> */}
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
                      {/* <div className="form-check form-check-sm form-check-custom form-check-solid">
                        <input className="form-check-input" type="checkbox" value="1" data-kt-check="true" data-kt-check-target=".widget-9-check" />
                      </div> */}
                      #
                    </th>
                    <th className="min-w-150px">Date de livraison</th>
                    <th className="min-w-200px">Code de la commande</th>
                    {/* <th className="min-w-100px text-end">Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {
                    deliveries.map((delivery, index) => (
                      <tr key={index}>
                        <td>
                          {/* <div className="form-check form-check-sm form-check-custom form-check-solid">
                            <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                          </div> */}
                          {index+1}
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="d-flex justify-content-start flex-column">
                              <a className="text-gray-900 fw-bold text-hover-primary fs-6">{formatDate(delivery.dateLivraison)}</a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <a className="text-gray-900 fw-bold text-hover-primary fs-6">{delivery.Commande.codeCommande}</a>
                        </td>
                        {/* <td>
                          <div className="d-flex justify-content-end flex-shrink-0">
                            <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" data-bs-toggle="modal" data-bs-target="#kt_modal_edit" data-category-id={delivery.id}>
                              <i className="ki-outline ki-pencil fs-2"></i>
                            </a>
                            <a href="#" className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm" onClick={(e) => confirmDelete(delivery.id)}>
                              <i className="ki-outline ki-trash fs-2"></i>
                            </a>
                          </div>
                        </td> */}
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {/* Create Category Modal */}
              <div className="modal fade" id="kt_modal_share_earn" tabIndex="-1" aria-hidden="true" >
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
                          <h1 className="mb-3">Enregistrer une livraison</h1>
                          <div className="text-muted fw-semibold fs-5">Entrez les informations pour enregistrer la livraison.
                          </div>
                        </div>
                        <form id="kt_ecommerce_settings_general_form" className="form">
                          <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Date de la livraison</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez la date de la livraison">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="date" min={getCurrentDate()} className="form-control form-control-solid" name="dateLivraison" value={formData.dateLivraison} onChange={handleChange} />
                              </div>
                            </div>
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Code de la commande</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez l'identifiant de la commande">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <div className="w-100">
                                  <select id="kt_ecommerce_select2_country" className="form-select form-select-solid" data-kt-ecommerce-settings-type="select2_flags" data-placeholder="Sélectionnez..." onChange={handleChange} name='idCommande'>
                                    <option value="">Sélectionnez...</option>
                                    {
                                      orders.map((order, index) => (
                                        <option key={index} value={order.id}>{order.codeCommande}</option>
                                      ))
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Deliveries