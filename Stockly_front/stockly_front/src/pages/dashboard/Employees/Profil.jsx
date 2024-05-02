import React from 'react'

const Profil = () => {
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
              <li className="breadcrumb-item text-gray-500 mx-n1">Profil</li>
            </ul>
            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Mon profil</h1>
          </div>
        </div>
      </div>

      <div id="kt_app_content" class="app-content">
        <div class="d-flex flex-column flex-lg-row">
          <div class="flex-column flex-lg-row-auto w-lg-250px w-xl-350px mb-10">
            <div class="card mb-5 mb-xl-8">
              <div class="card-body">
                <div class="d-flex flex-center flex-column py-5">
                  <div class="symbol symbol-100px symbol-circle mb-7">
                    <img src="assets/media/avatars/300-6.jpg" alt="image" />
                  </div>
                  <a class="fs-3 text-gray-800 fw-bold mb-3">Emma Smith</a>
                  <a class="fs-6 text-gray-600 mb-3">@Emma</a>
                  <div class="mb-9">
                    <div class="badge badge-lg badge-light-primary d-inline">Administrator</div>
                  </div>
                </div>
                <div class="d-flex flex-stack fs-4 py-3">
                  <div class="fw-bold rotate collapsible" data-bs-toggle="collapse" href="#kt_user_view_details" role="button" aria-expanded="false" aria-controls="kt_user_view_details">Détails
                    <span class="ms-2 rotate-180">
                      <i class="ki-outline ki-down fs-3"></i>
                    </span></div>
                </div>
                <div class="separator"></div>
                <div id="kt_user_view_details" class="collapse show">
                  <div class="pb-5 fs-6">
                    <div class="fw-bold mt-5">Adresse</div>
                    <div class="text-gray-600">101 Collin Street</div>

                    <div class="fw-bold mt-5">Contact</div>
                    <div class="text-gray-600">101 Collin Street</div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="flex-lg-row-fluid ms-lg-15">
            <ul class="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8">
              <li class="nav-item">
                <a class="nav-link text-active-primary pb-4 active" data-bs-toggle="tab" href="#kt_user_view_overview_tab">Activités</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-active-primary pb-4" data-kt-countup-tabs="true" data-bs-toggle="tab" href="#kt_user_view_overview_security">Profil</a>
              </li>
            </ul>

            <div class="tab-content" id="myTabContent">
              {/* <!--begin::Tap pane--> */}
              <div class="tab-pane fade show active" id="kt_user_view_overview_tab" role="tabpanel">
                <div class="card card-flush mb-6 mb-xl-9">
                  <div class="card-header mt-6">
                    <div class="card-title flex-column">
                      <h2 class="mb-1">User's Tasks</h2>
                      <div class="fs-6 fw-semibold text-muted">Total 25 tasks in backlog</div>
                    </div>
                    <div class="card-toolbar">
                      <button type="button" class="btn btn-light-primary btn-sm">
                        <i class="ki-outline ki-add-files fs-3"></i>Imprimer</button>
                    </div>
                  </div>
                  <div class="card-body d-flex flex-column">
                    <div class="d-flex align-items-center position-relative mb-7">
                      <div class="position-absolute top-0 start-0 rounded h-100 bg-secondary w-4px"></div>
                      <div class="fw-semibold ms-5">
                        <a href="#" class="fs-5 fw-bold text-gray-900 text-hover-primary">Create FureStibe branding logo</a>
                        <div class="fs-7 text-muted">Due in 1 day
                          <a href="#">Karina Clark</a></div>
                      </div>
                      <button type="button" class="btn btn-icon btn-active-light-primary w-30px h-30px ms-auto" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                        <i class="ki-outline ki-setting-3 fs-3"></i>
                      </button>
                      <div class="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-kt-menu="true" data-kt-menu-id="kt-users-tasks">
                        <div class="px-7 py-5">
                          <div class="fs-5 text-gray-900 fw-bold">Update Status</div>
                        </div>
                        <div class="separator border-gray-200"></div>
                        <form class="form px-7 py-5" data-kt-menu-id="kt-users-tasks-form">
                          <div class="fv-row mb-10">
                            <label class="form-label fs-6 fw-semibold">Status:</label>
                            <select class="form-select form-select-solid" name="task_status" data-kt-select2="true" data-placeholder="Select option" data-allow-clear="true" data-hide-search="true">
                              <option></option>
                              <option value="1">Approved</option>
                              <option value="2">Pending</option>
                              <option value="3">In Process</option>
                              <option value="4">Rejected</option>
                            </select>
                          </div>
                          <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-sm btn-light btn-active-light-primary me-2" data-kt-users-update-task-status="reset">Reset</button>
                            <button type="submit" class="btn btn-sm btn-primary" data-kt-users-update-task-status="submit">
                              <span class="indicator-label">Apply</span>
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

              <div class="tab-pane fade" id="kt_user_view_overview_security" role="tabpanel">
                <div class="card pt-4 mb-6 mb-xl-9">
                  <div class="card-header border-0">
                    <div class="card-title">
                      <h2>Profile</h2>
                    </div>
                  </div>
                  <div class="card-body pt-0 pb-5">
                    <div class="table-responsive">
                      <table class="table align-middle table-row-dashed gy-5" id="kt_table_users_login_session">
                        <tbody class="fs-6 fw-semibold text-gray-600">
                          <tr>
                            <td>Nom d'utilisateur</td>
                            <td>smith@kpmg.com</td>
                            <td class="text-end">
                              <button type="button" class="btn btn-icon btn-active-light-primary w-30px h-30px ms-auto" data-bs-toggle="modal" data-bs-target="#kt_modal_update_email">
                                <i class="ki-outline ki-pencil fs-3"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>Mot de passe</td>
                            <td>******</td>
                            <td class="text-end">
                              <button type="button" class="btn btn-icon btn-active-light-primary w-30px h-30px ms-auto" data-bs-toggle="modal" data-bs-target="#kt_modal_update_password">
                                <i class="ki-outline ki-pencil fs-3"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="kt_modal_update_email" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered mw-650px">
            <div class="modal-content">
              <div class="modal-header">
                <h2 class="fw-bold">Modifier mon nom d'utilisateur</h2>
                <div class="btn btn-icon btn-sm btn-active-icon-primary" data-kt-users-modal-action="close">
                  <i class="ki-outline ki-cross fs-1"></i>
                </div>
              </div>
              <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
                <form id="kt_modal_update_email_form" class="form" action="#">
                  <div class="notice d-flex bg-light-primary rounded border-primary border border-dashed mb-9 p-6">
                    <i class="ki-outline ki-information fs-2tx text-primary me-4"></i>
                    <div class="d-flex flex-stack flex-grow-1">
                      <div class="fw-semibold">
                        <div class="fs-6 text-gray-700">Si vous modifiez votre nom d'utilisateur, n'oubliez pas de d'utiliser pour vos prochaines connexions</div>
                      </div>
                    </div>
                  </div>
                  <div class="fv-row mb-7">
                    <label class="fs-6 fw-semibold form-label mb-2">
                      <span class="required">Nom d'utilisateur</span>
                    </label>
                    <input class="form-control form-control-solid" placeholder="" name="profile_email" value="smith@kpmg.com" />
                  </div>
                  <div class="text-center pt-15">
                    <button type="reset" class="btn btn-light me-3" data-kt-users-modal-action="cancel" data-dismiss="modal">Annuler</button>
                    <button type="submit" class="btn btn-primary" data-kt-users-modal-action="submit">
                      <span class="indicator-label">Enregistrer les modifications</span>
                      <span class="indicator-progress">Please wait...
                        <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="kt_modal_update_password" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered mw-650px">
            <div class="modal-content">
              <div class="modal-header">

                <h2 class="fw-bold">Modifier mon mot de passe</h2>
                <div class="btn btn-icon btn-sm btn-active-icon-primary" data-kt-users-modal-action="close">
                  <i class="ki-outline ki-cross fs-1"></i>
                </div>
              </div>
              <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
                <form id="kt_modal_update_password_form" class="form" action="#">
                  <div class="fv-row mb-10">
                    <label class="required form-label fs-6 mb-2">Mot de passe actuel</label>
                    <input class="form-control form-control-lg form-control-solid" type="password" placeholder="" name="current_password" autocomplete="off" />
                  </div>
                  <div class="mb-10 fv-row" data-kt-password-meter="true">
                    <div class="mb-1">
                      <label class="form-label fw-semibold fs-6 mb-2">Nouveau mot de passe</label>
                      <div class="position-relative mb-3">
                        <input class="form-control form-control-lg form-control-solid" type="password" placeholder="" name="new_password" autocomplete="off" />
                        <span class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" data-kt-password-meter-control="visibility">
                          <i class="ki-outline ki-eye-slash fs-1"></i>
                          <i class="ki-outline ki-eye d-none fs-1"></i>
                        </span>
                      </div>
                      <div class="d-flex align-items-center mb-3" data-kt-password-meter-control="highlight">
                        <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                        <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                        <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                        <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
                      </div>
                    </div>
                    <div class="text-muted">Le mot de passe est compris entre 6 et 8 caractères et peut contenir des lettres, des numéros et des symboles.</div>
                  </div>
                  <div class="fv-row mb-10">
                    <label class="form-label fw-semibold fs-6 mb-2">Confirmez le mot de passe</label>
                    <input class="form-control form-control-lg form-control-solid" type="password" placeholder="" name="confirm_password" autocomplete="off" />
                  </div>
                  <div class="text-center pt-15">
                    <button type="reset" class="btn btn-light me-3" data-kt-users-modal-action="cancel">Discard</button>
                    <button type="submit" class="btn btn-primary" data-kt-users-modal-action="submit">
                      <span class="indicator-label">Submit</span>
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
    </>
  )
}

export default Profil