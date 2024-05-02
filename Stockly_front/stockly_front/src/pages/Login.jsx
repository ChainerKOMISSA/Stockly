import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../components/constantes'

const Login = () => {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    const username = document.querySelector('input[name="username"]').value;
    const motdepasse = document.querySelector('input[name="motdepasse"]').value;

    if (!username || !motdepasse) {
      alert("Veuillez entrer un nom d'utilisateur et un mot de passe.");
      return;
    } else {
      const data = {
        username: username,
        motdepasse: motdepasse
      }
      fetch(`${API_URL}/employes/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.success) {
            console.log("Connexion réussie");
            alert(responseData.message);
            console.log("Connexion échouée");
          } else {
            alert(responseData.message);
          }
        })
        .catch(error => {
          alert('Erreur lors de la requête:', error);
        });
    }

  }
  return (
    <>
      <div id="kt_body" className="app-blank bgi-size-cover bgi-attachment-fixed bgi-position-center bgi-no-repeat">        <div className="d-flex flex-column flex-root" id="kt_app_root" style={{ backgroundImage: "url('assets/media/auth/bg4.jpg')" }}>
        <div className="d-flex flex-column flex-column-fluid flex-lg-row">
          <div className="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
            <div className="d-flex flex-center flex-lg-start flex-column">
              <a href="#" className="mb-7">
                <img alt="Logo" src="assets/media/logos/custom-3.svg" />
              </a>
              <h2 className="text-white fw-normal m-0">Votre application de gestion de boutique</h2>
            </div>
          </div>
          <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20">
            <div className="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-20">
              <div className="d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-15 pb-lg-20">
                <form className="form w-100" id="kt_sign_up_form">
                  <div className="text-center mb-11">
                    <h1 className="text-gray-900 fw-bolder mb-3">Se connecter</h1>
                    <div className="text-gray-500 fw-semibold fs-6">Entrez les informations pour vous connecter</div>
                  </div>
                  <div className="fv-row mb-8">
                    <input type="text" placeholder="Nom d'utilisateur" name="username" autoComplete="off" className="form-control bg-transparent" />
                  </div>
                  <div className="fv-row mb-8" data-kt-password-meter="true">
                    <div className="position-relative mb-3">
                      <input className="form-control bg-transparent" type="password" placeholder="Mot de passe" name="motdepasse" autoComplete="off" />
                    </div>
                  </div>

                  <div className="d-grid mb-10">
                    <button id="kt_sign_up_submit" type='submit' className="btn btn-primary" onClick={handleLogin}>
                      <span className="indicator-label">Se connecter</span>
                      <span className="indicator-progress">Please wait...
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
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

export default Login