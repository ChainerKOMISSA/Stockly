import React, { useState, useEffect } from 'react'
import { API_URL } from '../../components/constantes';
import { useNavigate } from 'react-router-dom'
import { createSuccessAlert, failureAlert, updateSuccessAlert, deleteSuccessAlert } from '../../components/alerts'
import { getCurrentDate } from '../../helpers/CalendarControl';
import { formatDate } from '../../helpers/DateFormat';
import { formatNumber } from '../../helpers/functions';


function Depenses() {
  const navigate = useNavigate()
  const [depenses, setDepenses] = useState([]);
  const [selectedDepense, setSelectedDepense] = useState({})
  const [formData, setFormData] = useState({});
  const [updatedData, setUpdatedData] = useState({});


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
      const response = await fetch(`${API_URL}/depenses`, {
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

  const handleDepenseSelection = (depenseId) => {
    fetch(`${API_URL}/depenses/${depenseId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        return response.json();
      })
      .then(depenseDetails => {
        setSelectedDepense(depenseDetails);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails de la dépense:', error);
      });
  };

  useEffect(() => {
    if (selectedDepense) {
      setUpdatedData({
        libelle: selectedDepense.libelle,
        montant: selectedDepense.montant,
        date: selectedDepense.date,
      });
    }
  }, [selectedDepense]);

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/depenses/${id}`, {
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

  const handleDelete = (id) => {
    try {
      const response = fetch(`${API_URL}/depenses/${id}`, {
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
              <li className="breadcrumb-item text-gray-500 mx-n1">Dépenses</li>
            </ul>
            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Liste des dépenses</h1>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content">
        <div className="card mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            <div className="card-toolbar align-items-center gap-2 gap-lg-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to add a user">
              <a href="#" className="btn btn-sm btn-light btn-active-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_share_earn">
                <i className="ki-outline ki-plus fs-2"></i>
                Enregistrer une dépense
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
                    <th className="w-25px">#</th>
                    <th className="min-w-200px">Date</th>
                    <th className="min-w-400px">Libellé</th>
                    <th className="min-w-100px">Montant (FCFA)</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    depenses.map((depense, index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>
                          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">{formatDate(depense.date)}</a>
                        </td>
                        <td>
                          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">{depense.libelle}</a>
                        </td>
                        <td>
                          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">{formatNumber(depense.montant)}</a>
                        </td>
                        {/* <td>
                        <div className="d-flex justify-content-end flex-shrink-0">
                          <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" data-bs-toggle="modal" data-bs-target="#kt_modal_edit" onClick={() => openupdateModal(depense.Id_Depense)}>
                            <i className="ki-outline ki-pencil fs-2"></i>
                          </a>
                          <a href="#" className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm" onClick={() => handleDelete(depense.Id_Depense)}>
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
                          <h1 className="mb-3">Enregistrer une dépense</h1>
                          <div className="text-muted fw-semibold fs-5">Entrez les informations pour enregistrer la dépense.
                          </div>
                        </div>
                        <form id="kt_ecommerce_settings_general_form" className="form">
                          <div className="fv-row mb-7">
                            <label className="fs-6 fw-semibold form-label mt-3">
                              <span className="required">Date</span>
                              <span className="ms-1" data-bs-toggle="tooltip" title="Entrez la date de la dépense">
                                <i className="ki-outline ki-information fs-7"></i>
                              </span>
                            </label>
                            <input type="date" min={getCurrentDate()} className="form-control form-control-solid" name="date" value={formData.date} onChange={handleChange} />
                          </div>
                          <div className="fv-row mb-7">
                            <label className="fs-6 fw-semibold form-label mt-3">
                              <span className="required">Libellé de la dépense</span>
                              <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le libellé">
                                <i className="ki-outline ki-information fs-7"></i>
                              </span>
                            </label>
                            <input type="text" className="form-control form-control-solid" name="libelle" value={formData.libelle} onChange={handleChange} />
                          </div>
                          <div className="fv-row mb-7">
                            <label className="fs-6 fw-semibold form-label mt-3">
                              <span className="required">Montant de la dépense</span>
                              <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le montant">
                                <i className="ki-outline ki-information fs-7"></i>
                              </span>
                            </label>
                            <input type="number" className="form-control form-control-solid" name="montant" value={formData.montant} onChange={handleChange} />
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
              {/* End Create Modal */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Depenses