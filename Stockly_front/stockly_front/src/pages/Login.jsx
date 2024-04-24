import React from 'react'

const Login = () => {

  const handleLogin = () => {
    
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
                    <h1 class="text-gray-900 fw-bolder mb-3">Se connecter</h1>
                    <div class="text-gray-500 fw-semibold fs-6">Entrez les informations pour vous connecter</div>
                  </div>
                  <div class="fv-row mb-8">
                    <input type="text" placeholder="Nom d'utilisateur" name="username" autocomplete="off" class="form-control bg-transparent" />
                  </div>
                  <div class="fv-row mb-8" data-kt-password-meter="true">
                    <div class="position-relative mb-3">
                      <input class="form-control bg-transparent" type="password" placeholder="Mot de passe" name="motdepasse" autocomplete="off" />
                    </div>
                  </div>

                  <div class="d-grid mb-10">
                    <button id="kt_sign_up_submit" class="btn btn-primary" onClick={handleLogin}>
                      <span class="indicator-label">Se connecter</span>
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

export default Login