import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../components/constantes'
import { createSuccessAlert, failureAlert, updateSuccessAlert, deleteSuccessAlert } from '../components/alerts'
import Swal from 'sweetalert2'


const Register = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/roles`)
      .then(response => response.json())
      .then(data => {
        setRoles(data)
      })
      .catch(error => {
        console.log('Erreur lors de la récupération des rôles: ', error);
      })
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }


  const handleRegister = async (e) => {
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
        createSuccessAlert();
        navigate("/")
      } else {
        const errorData = await response.json();
        failureAlert(errorData)
      }
    } catch (error) {
      failureAlert(error);
    }
  }
  return (
    <>
      <div id="kt_body" class="app-blank bgi-size-cover bgi-attachment-fixed bgi-position-center bgi-no-repeat">        <div class="d-flex flex-column flex-root" id="kt_app_root" style={{ backgroundImage: "url('assets/media/auth/bg4.jpg')" }}>
        <div class="d-flex flex-column flex-column-fluid flex-lg-row">
          <div class="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
            <div class="d-flex flex-center flex-lg-start flex-column">
              <a href="index.html" class="mb-7">
                <img alt="Logo" src="assets/media/logos/custom-3.svg" />
              </a>
              <h2 class="text-white fw-normal m-0">Votre application de gestion de boutique</h2>
            </div>
          </div>
          <div class="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20">
            <div class="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-20">
              <div class="d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-15 pb-lg-20">
                <form class="form w-100" novalidate="novalidate" id="kt_sign_up_form">
                  <div class="text-center mb-11">
                    <h1 class="text-gray-900 fw-bolder mb-3">Enregistrer un employé</h1>
                    <div class="text-gray-500 fw-semibold fs-6">Entrer les informations pour enregistrer un employé</div>
                  </div>
                  {/* <div class="separator separator-content my-14">
                    <span class="w-125px text-gray-500 fw-semibold fs-7">Or with email</span>
                  </div> */}
                  <div class="fv-row mb-8">
                    <input type="text" placeholder="Nom" name="nom" autocomplete="off" class="form-control bg-transparent" onChange={handleChange} />
                  </div>
                  <div class="fv-row mb-8">
                    <input type="text" placeholder="Prénom(s)" name="prenom" autocomplete="off" class="form-control bg-transparent" onChange={handleChange}/>
                  </div>
                  <div class="fv-row mb-8" data-kt-password-meter="true">
                    <div class="mb-1">
                      <div class="position-relative mb-3">
                        <input class="form-control bg-transparent" type="password" placeholder="Mot de passe" name="motdepasse" autocomplete="off" onChange={handleChange} />
                        {/* <span class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" data-kt-password-meter-control="visibility">
                          <i class="ki-outline ki-eye-slash fs-2"></i>
                          <i class="ki-outline ki-eye fs-2 d-none"></i>
                        </span> */}
                      </div>
                      {/* <div class="d-flex align-items-center mb-3" data-kt-password-meter-control="highlight">
                        <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                        <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                        <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                        <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
                      </div> */}
                    </div>
                    <div class="text-muted">Le mot de passe doit avoir au plus 8 caractères</div>
                  </div>
                  <div class="fv-row mb-8">
                    <input placeholder="Confirmez le mot de passe" type="password" autocomplete="off" class="form-control bg-transparent" />
                  </div>
                  <div class="fv-row mb-8">
                    <select name="idRole" id="idRole" autocomplete="off" class="form-control bg-transparent" onChange={handleChange}>
                      <option value="" selected disabled>Attribuez un rôle à l'employé</option>
                      {
                        roles.map((role) => (
                          <option value={role.id}>{role.libelle}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div class="d-grid mb-10">
                    <button id="kt_sign_up_submit" class="btn btn-primary" onClick={handleRegister}>
                      <span class="indicator-label">Enregistrer</span>
                      <span class="indicator-progress">Please wait...
                        <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Register