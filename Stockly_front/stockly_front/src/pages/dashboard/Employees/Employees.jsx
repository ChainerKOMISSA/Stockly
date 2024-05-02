import React, { useState, useEffect } from 'react'
import { API_URL } from '../../../components/constantes'
import { useNavigate } from 'react-router-dom'
import { createSuccessAlert, failureAlert, updateSuccessAlert, deleteSuccessAlert, saveLoginSuccessAlert } from '../../../components/alerts'
import Swal from 'sweetalert2'


function Employees() {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState([])
  const [roles, setRoles] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState({})
  const [formData, setFormData] = useState({});
  const [updatedData, setUpdatedData] = useState({});


  useEffect(() => {
    fetch(`${API_URL}/roles`)
      .then(response => response.json())
      .then(data => {
        setRoles(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des rôles: ', error)
      })
  }, []);


  useEffect(() => {
    fetch(`${API_URL}/employes`)
      .then(response => response.json())
      .then(data => {
        setEmployees(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des employés: ', error)
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
      const response = await fetch(`${API_URL}/employes`, {
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

  const handleEmployeeSelection = (employeeId) => {
    fetch(`${API_URL}/employes/${employeeId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        return response.json();
      })
      .then(employeeDetails => {
        setSelectedEmployee(employeeDetails);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des détails de l'employé:", error);
      });
  };


  useEffect(() => {
    if (selectedEmployee) {
      setUpdatedData({
        id: selectedEmployee.id,
        idRole: selectedEmployee.idRole,
        nom: selectedEmployee.nom,
        prenom: selectedEmployee.prenom,
        adresse: selectedEmployee.adresse,
        contact: selectedEmployee.contact
      });
    }
  }, [selectedEmployee]);


  const handleUpdate = async (e, id) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/employes/${id}`, {
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
      const response = await fetch(`${API_URL}/employes/${id}`, {
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


  const setVisible = () => {
    document.getElementById("generator").hidden = false;
    document.getElementById("btn_generer").hidden = true;
  }
  // Variables de génération de mot de passe
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(6);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useLowerCase, setUseLowerCase] = useState(true);
  const [useUpperCase, setUseUpperCase] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = password;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setSuccessMessage("Vous avez copié le mot de passe");
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const generatePassword = () => {
    let charset = "";
    let newPassword = "";

    if (useSymbols) charset += "!@#$%^&*()";
    if (useNumbers) charset += "0123456789";
    if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < passwordLength; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
    setSuccessMessage("Le mot de passe a été généré! Veuillez le copier et le communiquer à l'employé pour sa connexion.");
    setTimeout(() => setSuccessMessage(""), 10000);
  };


  function confirmSaveLogins(id) {
    Swal.fire({
      title: "Voulez-vous enregistrer ces identifiants pour cet utilisateur?",
      text: `Ce utilisateur pourra désormais utiliser ces identifiants pour se connecter`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, enregistrer"
    }).then((result) => {
      if (result.isConfirmed) {
        handleSaveLogins(id);
      }
    });
  }

  const handleSaveLogins = async (id) => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("generated_pass").value;
    let logindata = {
      "id": id,
      "username": username,
      "motdepasse": password
    };

    try {
      const response = await fetch(`${API_URL}/employes/identifiants/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logindata),
      });
      if (response.ok) {
        const data = await response.json();
        saveLoginSuccessAlert()
      } else {
        const errorData = await response.json();
        failureAlert(errorData)
      }

    } catch (error) {
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
              <li className="breadcrumb-item text-gray-500 mx-n1">Employés</li>
            </ul>
            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Liste des employés</h1>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content">
        <div className="card mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            <div className="card-toolbar align-items-center gap-2 gap-lg-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to add a user">
              <a href="#" className="btn btn-sm btn-light btn-active-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_share_earn">
                <i className="ki-outline ki-plus fs-2"></i>
                Nouvel employé
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
                    <th className="min-w-150px">Nom et prénom(s)</th>
                    <th className="min-w-180px">Rôle</th>
                    <th className="min-w-200px">Adresse</th>
                    <th className="min-w-100px">Contact</th>
                    <th className="min-w-100px text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    employees.map((employee, index) => (
                      <tr key={index}>
                        <td>
                          <div className="form-check form-check-sm form-check-custom form-check-solid">
                            <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="d-flex justify-content-start flex-column">
                              <a className="text-gray-900 fw-bold text-hover-primary fs-6">{employee.nom} {employee.prenom}</a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <a className="text-gray-900 fw-bold text-hover-primary fs-6">{employee.Role.libelle}</a>
                        </td>
                        <td>
                          <a className="text-gray-900 fw-bold text-hover-primary fs-6">{employee.adresse}</a>
                        </td>
                        <td>
                          <a className="text-gray-900 fw-bold text-hover-primary fs-6">{employee.contact}</a>
                        </td>
                        <td>
                          <div className="d-flex justify-content-end flex-shrink-0">
                            <a href="#"
                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                              data-bs-toggle="modal"
                              data-bs-target="#kt_modal_edit"
                              data-employe-id={employee.id}
                              onClick={() => handleEmployeeSelection(employee.id)}>
                              <i className="ki-outline ki-pencil fs-2"></i>
                            </a>
                            <a href="#" className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm" onClick={(e) => confirmDelete(employee.id)}>
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
                          <h1 className="mb-3">Enregister un employé</h1>
                          <div className="text-muted fw-semibold fs-5">Entrez les informations pour enregister l'employé.
                          </div>
                        </div>
                        <form id="kt_ecommerce_settings_general_form" className="form">
                          <div className="fv-row mb-7">
                            <label className="fs-6 fw-semibold form-label mt-3">
                              <span className="required">Rôle de l'employé</span>
                              <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le rôle de l'employé">
                                <i className="ki-outline ki-information fs-7"></i>
                              </span>
                            </label>
                            <div className="w-100">
                              <select id="kt_ecommerce_select2_country" className="form-select form-select-solid" data-kt-ecommerce-settings-type="select2_flags" data-placeholder="Sélectionnez..." onChange={handleChange} name='idRole'>
                                <option value="">Sélectionnez...</option>
                                {
                                  roles.map((role, index) => (
                                    <option key={index} value={role.id}>{role.libelle}</option>
                                  ))
                                }
                              </select>
                            </div>
                          </div>
                          <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Nom de l'employé</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le nom de l'employé">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="text" className="form-control form-control-solid" name="nom" value={formData.nom} onChange={handleChange} />
                              </div>
                            </div>
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Prénom de l'employé</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le prénom de l'employé">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="text" className="form-control form-control-solid" name="prenom" value={formData.prenom} onChange={handleChange} />
                              </div>
                            </div>
                          </div>
                          <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Adresse de l'employé</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez l'adresse de l'employé">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="text" className="form-control form-control-solid" name="adresse" value={formData.adresse} onChange={handleChange} />
                              </div>
                            </div>
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Contact de l'employé</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le contact de l'employé">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="text" className="form-control form-control-solid" name="contact" value={formData.contact} onChange={handleChange} />
                              </div>
                            </div>
                          </div>
                          <div className="separator mb-6"></div>
                          <div className="d-flex justify-content-end">
                            <button type="reset" data-kt-contacts-type="cancel" className="btn btn-light me-3">Annuler</button>
                            <button className="btn btn-primary" onClick={handleSubmit}>
                              <span className="indicator-label">Enregistrer</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Create Category Modal */}
              {/* Edit Category Modal */}
              {
                selectedEmployee && (
                  < div className="modal fade" id="kt_modal_edit" tabIndex="-1" aria-hidden="true" >
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
                              <h1 className="mb-3">Modifier cet employé</h1>
                              <div className="text-muted fw-semibold fs-5">Entrez les informations pour modifier l'employé.
                              </div>
                            </div>
                            <form id="kt_ecommerce_settings_general_form" className="form">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Rôle de l'employé</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le rôle de l'employé">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <div className="w-100">
                                  <select id="kt_ecommerce_select2_country" value={updatedData.idRole} className="form-select form-select-solid" data-kt-ecommerce-settings-type="select2_flags" data-placeholder="Sélectionnez..." onChange={handleUpdateChange} name='idRole'>
                                    <option value="">Sélectionnez...</option>
                                    {
                                      roles.map((role, index) => (
                                        <option key={index} value={role.id}>{role.libelle}</option>
                                      ))
                                    }
                                  </select>
                                </div>
                              </div>
                              <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                                <div className="col">
                                  <div className="fv-row mb-7">
                                    <label className="fs-6 fw-semibold form-label mt-3">
                                      <span className="required">Nom de l'employé</span>
                                      <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le nom de l'employé">
                                        <i className="ki-outline ki-information fs-7"></i>
                                      </span>
                                    </label>
                                    <input type="text" className="form-control form-control-solid" name="nom" value={updatedData.nom} onChange={handleUpdateChange} />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="fv-row mb-7">
                                    <label className="fs-6 fw-semibold form-label mt-3">
                                      <span className="required">Prénom de l'employé</span>
                                      <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le prénom de l'employé">
                                        <i className="ki-outline ki-information fs-7"></i>
                                      </span>
                                    </label>
                                    <input type="text" className="form-control form-control-solid" name="prenom" value={updatedData.prenom} onChange={handleUpdateChange} />
                                  </div>
                                </div>
                              </div>
                              <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                                <div className="col">
                                  <div className="fv-row mb-7">
                                    <label className="fs-6 fw-semibold form-label mt-3">
                                      <span className="required">Adresse de l'employé</span>
                                      <span className="ms-1" data-bs-toggle="tooltip" title="Entrez l'adresse de l'employé">
                                        <i className="ki-outline ki-information fs-7"></i>
                                      </span>
                                    </label>
                                    <input type="text" className="form-control form-control-solid" name="adresse" value={updatedData.adresse} onChange={handleUpdateChange} />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="fv-row mb-7">
                                    <label className="fs-6 fw-semibold form-label mt-3">
                                      <span className="required">Contact de l'employé</span>
                                      <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le contact de l'employé">
                                        <i className="ki-outline ki-information fs-7"></i>
                                      </span>
                                    </label>
                                    <input type="text" className="form-control form-control-solid" name="contact" value={updatedData.contact} onChange={handleUpdateChange} />
                                  </div>
                                </div>
                              </div>
                              <div id='generator' hidden>
                                <div className="separator mb-6" id='line'></div>
                                <div className="mb-13 text-center">
                                  <h1 className="mb-3">Générateur d'identifiants de connexion</h1>
                                </div>
                                <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                                  <div className='col'>
                                    <label className="fs-6 fw-semibold form-label mt-3">
                                      <span className="required">Nom d'utilisateur</span>
                                      <span className="ms-1" data-bs-toggle="tooltip" title="Le nom d'utilisateur est par défaut le prénom de l'employé">
                                        <i className="ki-outline ki-information fs-7"></i>
                                      </span>
                                    </label>
                                  </div>
                                  <div className='col'>
                                    <input
                                      className="form-control form-control-solid"
                                      type="text"
                                      value={updatedData.prenom}
                                      id='username'
                                    />
                                  </div>
                                </div><br />
                                <div className="mb-13 text-center">
                                  <div className="text-muted fw-semibold fs-5" id='generator_title'>Générateur de mots de passe</div>
                                </div>
                                <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                                  <div className='col'>
                                    <label className="fs-6 fw-semibold form-label mt-3">
                                      <span className="required">Longueur du mot de passe</span>
                                      <span className="ms-1" data-bs-toggle="tooltip" title="Le mot de passe doit avoir entre 6 et 8 caractères">
                                        <i className="ki-outline ki-information fs-7"></i>
                                      </span>
                                    </label>
                                  </div>
                                  <div className='col'>
                                    <input
                                      className="form-control form-control-solid"
                                      type="number"
                                      min="6"
                                      max="8"
                                      value={passwordLength}
                                      onChange={(e) => setPasswordLength(e.target.value)}
                                    />
                                  </div>
                                </div> <br />
                                <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-4">
                                  <div className='col'><label className="form-check form-check-custom form-check-inline form-check-solid me-5">
                                    <input className="form-check-input" checked={useSymbols} onChange={() => setUseSymbols(!useSymbols)} type="checkbox" />
                                    <span className="fw-semibold ps-2 fs-6">Symboles</span>
                                  </label></div>
                                  <div className='col'><label className="form-check form-check-custom form-check-inline form-check-solid me-5">
                                    <input className="form-check-input" checked={useNumbers} onChange={() => setUseNumbers(!useNumbers)} type="checkbox" />
                                    <span className="fw-semibold ps-2 fs-6">Nombres</span>
                                  </label></div>
                                  <div className='col'><label className="form-check form-check-custom form-check-inline form-check-solid me-5">
                                    <input className="form-check-input" checked={useLowerCase} onChange={() => setUseLowerCase(!useLowerCase)} type="checkbox" />
                                    <span className="fw-semibold ps-2 fs-6">Minuscules</span>
                                  </label></div>
                                  <div className='col'><label className="form-check form-check-custom form-check-inline form-check-solid me-5">
                                    <input className="form-check-input" checked={useUpperCase} onChange={() => setUseUpperCase(!useUpperCase)} type="checkbox" />
                                    <span className="fw-semibold ps-2 fs-6">Majuscules</span>
                                  </label></div>
                                </div> <br />

                                <button type="button" className="btn btn-primary me-3" onClick={generatePassword}>Générer le mot de passe</button> <br />
                                {password && (
                                  <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-4">
                                    <div className='col'>
                                      <label className="fs-6 fw-semibold form-label mt-3">
                                        <span>Mot de passe généré</span>
                                      </label>
                                    </div>
                                    <div className='col'>
                                      <input
                                        className="form-control form-control-solid"
                                        value={password}
                                        readOnly
                                        id='generated_pass'
                                      />
                                    </div>
                                    {/* <div className='col'>
                                      <button type="button" className="btn btn-light me-3" onClick={copyToClipboard}>Copier</button>
                                    </div> */}
                                    <div className='col'>
                                      <button type="button" id='save_logins' className="btn btn-info me-3" onClick={() => confirmSaveLogins(updatedData.id)}>Enregistrer</button>
                                    </div>
                                  </div>
                                )}
                                {successMessage && (
                                  <div className="fw-semibold text-danger fs-5 text-center" id='generator_title'>{successMessage}</div>
                                )}

                              </div> <br />

                              <div className="separator mb-6"></div>
                              <div className="d-flex justify-content-center">
                                <button type="button" id='btn_generer' className="btn btn-info me-3" onClick={() => setVisible()}>Générer des indentifiants de connexion</button>
                                <button type="reset" data-kt-contacts-type="cancel" className="btn btn-light me-3">Annuler</button>
                                <button className="btn btn-primary" onClick={(e) => handleUpdate(e, selectedEmployee.id)}>
                                  <span className="indicator-label">Enregistrer les modificaitons</span>
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
              {/* End Edit Modal */}
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Employees