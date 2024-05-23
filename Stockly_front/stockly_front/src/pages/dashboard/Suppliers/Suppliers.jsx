import React, { useState, useEffect } from 'react'
import { API_URL } from '../../../components/constantes'
import { useNavigate } from 'react-router-dom'
import { createSuccessAlert, failureAlert, updateSuccessAlert, deleteSuccessAlert } from '../../../components/alerts'
import Swal from 'sweetalert2'
import "react-phone-input-2/lib/style.css";


function Suppliers() {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState({})
  const [formData, setFormData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);


  useEffect(() => {
    fetch(`${API_URL}/suppliers`)
      .then(response => response.json())
      .then(data => {
        setSuppliers(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des fournisseurs: ', error)
      })
  }, []);

  useEffect(() => {
    setFilteredSuppliers(
      suppliers.filter(supplier =>
        supplier.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, suppliers]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

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
      const response = await fetch(`${API_URL}/suppliers`, {
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

  const handleSupplierSelection = (supplierId) => {
    fetch(`${API_URL}/suppliers/${supplierId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        return response.json();
      })
      .then(supplierDetails => {
        setSelectedSupplier(supplierDetails);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails du forunisseur:', error);
      });
  };


  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  }

  useEffect(() => {
    if (selectedSupplier) {
      setUpdatedData({
        id: selectedSupplier.id,
        nom: selectedSupplier.nom,
        adresse: selectedSupplier.adresse,
        contact: selectedSupplier.contact,
      });
    }
  }, [selectedSupplier]);

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/suppliers/${id}`, {
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
      const response = await fetch(`${API_URL}/suppliers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
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
              <li className="breadcrumb-item text-gray-500 mx-n1">Fournisseurs</li>
            </ul>
            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Liste des fournisseurs</h1>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content">
        <div className="card mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            <div className="card-toolbar align-items-center gap-2 gap-lg-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to add a user">
              <a href="#" className="btn btn-sm btn-light btn-active-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_share_earn">
                <i className="ki-outline ki-plus fs-2"></i>
                Nouveau fournisseur
              </a>
              <a href="#" className="btn btn-sm btn-light-primary">
                <i className="ki-outline ki-printer fs-2"></i>
                Exporter
              </a>
              <div class="d-flex align-items-center">
                <div class="position-relative w-md-400px me-md-2">
                  <i class="ki-outline ki-magnifier fs-3 text-gray-500 position-absolute top-50 translate-middle ms-6"></i>
                  <input type="text" class="form-control form-control-solid ps-10" name="search" placeholder="Rechercher ..." value={searchTerm} onChange={handleSearchChange} />
                </div>
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
                    <th className="min-w-200px">Nom</th>
                    <th className="min-w-200px">Adresse</th>
                    <th className="min-w-180px">Contact</th>
                    <th className="min-w-100px text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filteredSuppliers.map((supplier, index) => (
                      <tr key={index}>
                        <td>
                          <div className="form-check form-check-sm form-check-custom form-check-solid">
                            <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="d-flex justify-content-start flex-column">
                              <a className="text-gray-900 fw-bold text-hover-primary fs-6">{supplier.nom}</a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <a className="text-gray-900 fw-bold text-hover-primary fs-6">{supplier.adresse}</a>
                        </td>
                        <td>
                          <a className="text-gray-900 fw-bold text-hover-primary fs-6">{supplier.contact}</a>
                        </td>
                        <td>
                          <div className="d-flex justify-content-end flex-shrink-0">
                            <a href="#"
                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                              data-bs-toggle="modal"
                              data-bs-target="#kt_modal_edit"
                              onClick={() => handleSupplierSelection(supplier.id)}>
                              <i className="ki-outline ki-pencil fs-2"></i>
                            </a>
                            <a href="#" className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm" onClick={(e) => confirmDelete(supplier.id)}>
                              <i className="ki-outline ki-trash fs-2"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {/* Create Supplier Modal */}
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
                          <h1 className="mb-3">Enregistrer un fournisseur</h1>
                          <div className="text-muted fw-semibold fs-5">Entrez les informations pour enregistrer le fournisseur.
                          </div>
                        </div>
                        <form id="kt_ecommerce_settings_general_form" className="form">
                          <div className="fv-row mb-7">
                            <label className="fs-6 fw-semibold form-label mt-3">
                              <span className="required">Nom du fournisseur</span>
                              <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le nom du fournisseur">
                                <i className="ki-outline ki-information fs-7"></i>
                              </span>
                            </label>
                            <input type="text" className="form-control form-control-solid" name="nom" value={formData.nom} onChange={handleChange} />
                          </div>
                          <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Adresse du fournisseur</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez l'adresse du fournisseur">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="text" className="form-control form-control-solid" name="adresse" value={formData.adresse} onChange={handleChange} />
                              </div>
                            </div>
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Contact du fournisseur</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le contact du fournisseur">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                {/* <PhoneInput
                                  className="number"
                                  country={"us"}
                                  value={formData.contact}
                                  onChange={handleChange}
                                /> */}
                                <input type="text" className="form-control form-control-solid" name="contact" value={formData.contact} onChange={handleChange} />
                              </div>
                            </div>
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

              {/* Edit Category Modal */}
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
                          <h1 className="mb-3">Modifier ce fournisseur</h1>
                          <div className="text-muted fw-semibold fs-5">Entrez les informations pour modifier le fournisseur.
                          </div>
                        </div>
                        <form id="kt_ecommerce_settings_general_form" className="form">
                          <div className="fv-row mb-7">
                            <label className="fs-6 fw-semibold form-label mt-3">
                              <span className="required">Nom du fournisseur</span>
                              <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le nom du fournisseur">
                                <i className="ki-outline ki-information fs-7"></i>
                              </span>
                            </label>
                            <input type="text" className="form-control form-control-solid" name="nom" value={updatedData.nom} onChange={handleUpdateChange} />
                          </div>
                          <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Adresse du fournisseur</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez l'adresse du fournisseur">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="text" className="form-control form-control-solid" name="adresse" value={updatedData.adresse} onChange={handleUpdateChange} />
                              </div>
                            </div>
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Contact du fournisseur</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le contact du fournisseur">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="text" className="form-control form-control-solid" name="contact" value={updatedData.contact} onChange={handleUpdateChange} />
                              </div>
                            </div>
                          </div>
                          <div class="separator mb-6"></div>
                          <div class="d-flex justify-content-end">
                            <button type="reset" data-kt-contacts-type="cancel" class="btn btn-light me-3">Annuler</button>
                            <button class="btn btn-primary" onClick={(e) => handleUpdate(e, selectedSupplier.id)}>
                              <span class="indicator-label">Enregistrer les modifications</span>
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
      </div>
    </>
  )
}

export default Suppliers