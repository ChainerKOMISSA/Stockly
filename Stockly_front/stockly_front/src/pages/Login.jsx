// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { API_URL } from '../components/constantes'
// import { failureAlert } from '../components/alerts'
// import { useUser } from './UserContext'

// const Login = () => {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour indiquer si l'utilisateur est connecté
//   const { setUserData } = useUser();


//   function handleAlerte(message) {
//     // Récupérer l'élément où vous souhaitez afficher le message d'alerte
//     const alertElement = document.getElementById('alert-container');

//     // Créer un nouvel élément de message d'alerte
//     const alertDiv = document.createElement('div');
//     alertDiv.className = 'alert alert-dismissible bg-danger d-flex flex-column flex-sm-row p-5 mb-10';
//     // Contenu du message d'alerte
//     alertDiv.innerHTML = `
//     <i class="ki-solid ki-information-3 fs-2hx text-light me-4 mb-5 mb-sm-0"></i>
//     <div class="d-flex flex-column text-light pe-0 pe-sm-10">
//             <h4 class="mb-2 light">Erreur</h4>
//             <span>${message}</span>
//         </div>
//         <button type="button" class="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto" data-bs-dismiss="alert">
//         <i class="ki-solid ki-cross fs-1 text-light"></i>
//     </button>
//       </div>
//     `;

//     // Ajouter le message d'alerte à l'élément parent
//     alertElement.appendChild(alertDiv);
//   }


//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const username = document.querySelector('input[name="username"]').value;
//     const motdepasse = document.querySelector('input[name="motdepasse"]').value;

//     if (!username || !motdepasse) {
//       handleAlerte("Veuillez entrer un nom d'utilisateur et un mot de passe.");
//       return;
//     } else {
//       const data = {
//         username: username,
//         motdepasse: motdepasse
//       }
//       try {
//         const response = await fetch(`${API_URL}/employes/login`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(data)
//         })
//           .then(response => response.json())
//           .then(responseData => {
//             if (responseData.success) {
//               const userData = responseData.data;
//               setUserData(userData);
//               navigate("/dashboard");
//             } else {
//               handleAlerte(responseData.message);
//             }
//           })

//       } catch (error) {
//         failureAlert(error)
//       }
//     }

//   }
//   return (
//     <>
//       <div id="kt_body" className="app-blank bgi-size-cover bgi-attachment-fixed bgi-position-center bgi-no-repeat">
//         <div className="d-flex flex-column flex-root" id="kt_app_root" style={{ backgroundImage: "url('assets/media/auth/bg4.jpg')" }}>
//           <div id="alert-container" className='px-20 mt-2'></div>
//           <div className="d-flex flex-column flex-column-fluid flex-lg-row">
//             <div className="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
//               <div className="d-flex flex-center flex-lg-start flex-column">
//                 <a href="#" className="mb-7">
//                   <img alt="Logo" src="assets/media/logos/custom-3.svg" />
//                 </a>
//                 <h2 className="text-white fw-normal m-0">Votre application de gestion de boutique</h2>
//               </div>
//             </div>
//             <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20">
//               <div className="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-20">
//                 <div className="d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-15 pb-lg-20">
//                   <form className="form w-100" id="kt_sign_up_form">
//                     <div className="text-center mb-11">
//                       <h1 className="text-gray-900 fw-bolder mb-3">Se connecter</h1>
//                       <div className="text-gray-500 fw-semibold fs-6">Entrez les informations pour vous connecter</div>
//                     </div>
//                     <div className="fv-row mb-8">
//                       <input type="text" placeholder="Nom d'utilisateur" name="username" autoComplete="off" className="form-control bg-transparent" />
//                     </div>
//                     <div className="fv-row mb-8" data-kt-password-meter="true">
//                       <div className="position-relative mb-3">
//                         <input className="form-control bg-transparent" type="password" placeholder="Mot de passe" name="motdepasse" autoComplete="off" />
//                       </div>
//                     </div>

//                     <div className="d-grid mb-10">
//                       <button id="kt_sign_up_submit" type='submit' className="btn btn-primary" onClick={handleLogin}>
//                         <span className="indicator-label">Se connecter</span>
//                         <span className="indicator-progress">Please wait...
//                           <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Login

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../components/constantes';
import { failureAlert } from '../components/alerts';
import { useUser } from './UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useUser();

  // État pour les champs du formulaire et les alertes
  const [username, setUsername] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleAlerte = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(''), 5000); // Effacer l'alerte après 5 secondes
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !motdepasse) {
      handleAlerte("Veuillez entrer un nom d'utilisateur et un mot de passe.");
      return;
    }

    const data = { username, motdepasse };

    try {
      const response = await fetch(`${API_URL}/employes/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      if (responseData.success) {
        const userData = responseData.data;
        setUserData(userData);
        navigate("/dashboard");
      } else {
        handleAlerte(responseData.message);
      }
    } catch (error) {
      failureAlert(error);
    }
  };

  return (
    <>
      <div id="kt_body" className="app-blank bgi-size-cover bgi-attachment-fixed bgi-position-center bgi-no-repeat">
        <div className="d-flex flex-column flex-root" style={{ backgroundImage: "url('assets/media/auth/bg4.jpg')" }}>
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
                  <form className="form w-100" onSubmit={handleLogin}>
                    <div className="text-center mb-11">
                      <h1 className="text-gray-900 fw-bolder mb-3">Se connecter</h1>
                      <div className="text-gray-500 fw-semibold fs-6">Entrez les informations pour vous connecter</div>
                    </div>
                    <div id="alert-container" className='px-20 mt-2'>
                      {alertMessage && (
                        <div className="alert alert-dismissible bg-danger d-flex flex-column flex-sm-row p-5 mb-10">
                          <i className="ki-solid ki-information-3 fs-2hx text-light me-4 mb-5 mb-sm-0"></i>
                          <div className="d-flex flex-column text-light pe-0 pe-sm-10">
                            <h4 className="mb-2 light">Erreur</h4>
                            <span>{alertMessage}</span>
                          </div>
                          <button type="button" className="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto" data-bs-dismiss="alert">
                            <i className="ki-solid ki-cross fs-1 text-light"></i>
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="fv-row mb-8">
                      <input
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="off"
                        className="form-control bg-transparent"
                      />
                    </div>
                    <div className="fv-row mb-8" data-kt-password-meter="true">
                      <div className="position-relative mb-3">
                        <input
                          className="form-control bg-transparent"
                          type="password"
                          placeholder="Mot de passe"
                          value={motdepasse}
                          onChange={(e) => setMotdepasse(e.target.value)}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="d-grid mb-10">
                      <button type='submit' className="btn btn-primary">
                        <span className="indicator-label">Se connecter</span>
                        <span className="indicator-progress">Veuillez patienter...
                          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
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
  );
}

export default Login;
