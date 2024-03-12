import React, { useState, useEffect } from 'react'
import { API_URL } from '../../components/constantes'
import { Link, useNavigate } from 'react-router-dom'
import { createSuccessAlert, failureAlert, updateSuccessAlert, deleteSuccessAlert } from '../../components/alerts'




function Incidents() {
  const navigate = useNavigate()
  const [showcreateModal, setShowCreateModal] = useState(false);
  const [showupdateModal, setShowUpdateModal] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null)
  const [formData, setFormData] = useState({});
  const [updatedData, setUpdatedData] = useState({});

  const opencreateModal = () => { setShowCreateModal(true) }
  const closecreateModal = () => { setShowCreateModal(false) }

  const openupdateModal = (incident) => { setShowUpdateModal(true); setSelectedIncident(incident) }
  const closeupdateModal = () => { setShowUpdateModal(false); setSelectedIncident(null) }

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
      const response = await fetch(`${API_URL}/createincident`, {
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
    if (selectedIncident) {
      setUpdatedData({
        Libelle_Incid: selectedIncident.Libelle_Incid,
        Description_Incid: selectedIncident.Description_Incid,
        Date_Incid: selectedIncident.Date_Incid,
      });
    }
  }, [selectedIncident]);

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/incident/${id}`, {
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
      const response = fetch(`${API_URL}/incident/${id}`, {
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
              <li className="breadcrumb-item text-gray-500 mx-n1">Incidents</li>
            </ul>
            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Liste des incidents</h1>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content">
        <div className="card mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            <div className="card-toolbar align-items-center gap-2 gap-lg-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to add a user">
              <a href="#" className="btn btn-sm btn-light btn-active-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_share_earn" onClick={() => opencreateModal()}>
                <i className="ki-outline ki-plus fs-2"></i>
                Enregistrer un incident
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
                  <th className="min-w-200px">Libellé</th>
                  <th className="min-w-300px">Description</th>
                  <th className="min-w-100px text-end">Actions</th>

                </tr>
              </thead>
              <tbody>
                {
                  incidents.map((incident, index) => (
                    <tr key={index}>
                      <td>
                        <div className="form-check form-check-sm form-check-custom form-check-solid">
                          <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                        </div>
                      </td>
                      <td>
                        <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">{incident.Date_Incid}</a>
                      </td>
                      <td>
                        <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">{incident.Libelle_Incid}</a>
                      </td>
                      <td>
                        <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">{incident.Description_Incid}</a>
                      </td>
                      <td>
                        <div className="d-flex justify-content-end flex-shrink-0">
                          <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" data-bs-toggle="modal" data-bs-target="#kt_modal_edit" onClick={() => openupdateModal(incident.Id_Incid)}>
                            <i className="ki-outline ki-pencil fs-2"></i>
                          </a>
                          <a href="#" className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm" onClick={() => handleDelete(incident.Id_Incid)}>
                            <i className="ki-outline ki-trash fs-2"></i>
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
    </>
  )
}

export default Incidents