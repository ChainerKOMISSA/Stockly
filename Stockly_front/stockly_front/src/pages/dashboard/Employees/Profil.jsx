import React, {useContext} from 'react'
import { useUser } from '../../UserContext'

const Profil = () => {

  const { userData } = useUser();

  console.log(userData);

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

      <div id="kt_app_content" className="app-content">
        <div className="d-flex flex-column flex-lg-row">
          <div className="flex-column flex-lg-row-auto w-lg-250px w-xl-350px mb-10">
            <div className="card mb-5 mb-xl-8">
              <div className="card-body">
                <div className="d-flex flex-center flex-column py-5">
                  <div className="symbol symbol-100px symbol-circle mb-7">
                    <img src="assets/media/avatars/300-6.jpg" alt="image" />
                  </div>
                  <a className="fs-3 text-gray-800 fw-bold mb-3">Emma Stone</a>
                  <a className="fs-6 text-gray-600 mb-3">@Emma</a>
                  <div className="mb-9">
                    <div className="badge badge-lg badge-light-primary d-inline">Administrator</div>
                  </div>
                </div>
                <div className="d-flex flex-stack fs-4 py-3">
                  <div className="fw-bold rotate collapsible" data-bs-toggle="collapse" href="#kt_user_view_details" role="button" aria-expanded="false" aria-controls="kt_user_view_details">Détails
                    <span className="ms-2 rotate-180">
                      <i className="ki-outline ki-down fs-3"></i>
                    </span></div>
                </div>
                <div className="separator"></div>
                <div id="kt_user_view_details" className="collapse show">
                  <div className="pb-5 fs-6">
                    <div className="fw-bold mt-5">Adresse</div>
                    <div className="text-gray-600">101 Collin Street</div>

                    <div className="fw-bold mt-5">Contact</div>
                    <div className="text-gray-600">101 Collin Street</div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="flex-lg-row-fluid ms-lg-15">
            <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8">
              <li className="nav-item">
                <a className="nav-link text-active-primary pb-4 active" data-bs-toggle="tab" href="#kt_user_view_overview_tab">Activités</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-active-primary pb-4" data-kt-countup-tabs="true" data-bs-toggle="tab" href="#kt_user_view_overview_security">Profil</a>
              </li>
            </ul>

            <div className="tab-content" id="myTabContent">
              {/* <!--begin::Tap pane--> */}
              <div className="tab-pane fade show active" id="kt_user_view_overview_tab" role="tabpanel">
                <div className="card card-flush mb-6 mb-xl-9">
                  <div className="card-header mt-6">
                    <div className="card-title flex-column">
                      <h2 className="mb-1">User's Tasks</h2>
                      <div className="fs-6 fw-semibold text-muted">Total 25 tasks in backlog</div>
                    </div>
                    <div className="card-toolbar">
                      <button type="button" className="btn btn-light-primary btn-sm">
                        <i className="ki-outline ki-add-files fs-3"></i>Imprimer</button>
                    </div>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex align-items-center position-relative mb-7">
                      <div className="position-absolute top-0 start-0 rounded h-100 bg-secondary w-4px"></div>
                      <div className="fw-semibold ms-5">
                        <a href="#" className="fs-5 fw-bold text-gray-900 text-hover-primary">Create FureStibe branding logo</a>
                        <div className="fs-7 text-muted">Due in 1 day
                          <a href="#">Karina Clark</a></div>
                      </div>
                      <button type="button" className="btn btn-icon btn-active-light-primary w-30px h-30px ms-auto" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                        <i className="ki-outline ki-setting-3 fs-3"></i>
                      </button>
                      <div className="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-kt-menu="true" data-kt-menu-id="kt-users-tasks">
                        <div className="px-7 py-5">
                          <div className="fs-5 text-gray-900 fw-bold">Update Status</div>
                        </div>
                        <div className="separator border-gray-200"></div>
                        <form className="form px-7 py-5" data-kt-menu-id="kt-users-tasks-form">
                          <div className="fv-row mb-10">
                            <label className="form-label fs-6 fw-semibold">Status:</label>
                            <select className="form-select form-select-solid" name="task_status" data-kt-select2="true" data-placeholder="Select option" data-allow-clear="true" data-hide-search="true">
                              <option></option>
                              <option value="1">Approved</option>
                              <option value="2">Pending</option>
                              <option value="3">In Process</option>
                              <option value="4">Rejected</option>

                            </select>
                          </div>
                          <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-sm btn-light btn-active-light-primary me-2" data-kt-users-update-task-status="reset">Reset</button>
                            <button type="submit" className="btn btn-sm btn-primary" data-kt-users-update-task-status="submit">
                              <span className="indicator-label">Apply</span>
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

              <div className="tab-pane fade" id="kt_user_view_overview_security" role="tabpanel">
                <div className="card pt-4 mb-6 mb-xl-9">
                  <div className="card-header border-0">
                    <div className="card-title">
                      <h2>Profile</h2>
                    </div>
                  </div>
                  <div className="card-body pt-0 pb-5">
                    <div className="table-responsive">
                      <table className="table align-middle table-row-dashed gy-5" id="kt_table_users_login_session">
                        <tbody className="fs-6 fw-semibold text-gray-600">
                          <tr>
                            <td>Nom d'utilisateur</td>
                            <td>smith@kpmg.com</td>
                            <td className="text-end">
                              <button type="button" className="btn btn-icon btn-active-light-primary w-30px h-30px ms-auto" data-bs-toggle="modal" data-bs-target="#kt_modal_update_email">
                                <i className="ki-outline ki-pencil fs-3"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>Mot de passe</td>
                            <td>******</td>
                            <td className="text-end">
                              <button type="button" className="btn btn-icon btn-active-light-primary w-30px h-30px ms-auto" data-bs-toggle="modal" data-bs-target="#kt_modal_update_password">
                                <i className="ki-outline ki-pencil fs-3"></i>
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

        <div className="modal fade" id="kt_modal_update_email" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered mw-650px">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="fw-bold">Modifier mon nom d'utilisateur</h2>
                <div className="btn btn-icon btn-sm btn-active-icon-primary" data-kt-users-modal-action="close">
                  <i className="ki-outline ki-cross fs-1"></i>
                </div>
              </div>
              <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
                <form id="kt_modal_update_email_form" className="form" action="#">
                  <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed mb-9 p-6">
                    <i className="ki-outline ki-information fs-2tx text-primary me-4"></i>
                    <div className="d-flex flex-stack flex-grow-1">
                      <div className="fw-semibold">
                        <div className="fs-6 text-gray-700">Si vous modifiez votre nom d'utilisateur, n'oubliez pas de d'utiliser pour vos prochaines connexions</div>
                      </div>
                    </div>
                  </div>
                  <div className="fv-row mb-7">
                    <label className="fs-6 fw-semibold form-label mb-2">
                      <span className="required">Nom d'utilisateur</span>
                    </label>
                    <input className="form-control form-control-solid" placeholder="smith@kpmg.com" name="profile_email" />
                  </div>
                  <div className="text-center pt-15">
                    <button type="reset" className="btn btn-light me-3" data-kt-users-modal-action="cancel" data-dismiss="modal">Annuler</button>
                    <button type="submit" className="btn btn-primary" data-kt-users-modal-action="submit">
                      <span className="indicator-label">Enregistrer les modifications</span>
                      <span className="indicator-progress">Please wait...
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="kt_modal_update_password" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered mw-650px">
            <div className="modal-content">
              <div className="modal-header">

                <h2 className="fw-bold">Modifier mon mot de passe</h2>
                <div className="btn btn-icon btn-sm btn-active-icon-primary" data-kt-users-modal-action="close">
                  <i className="ki-outline ki-cross fs-1"></i>
                </div>
              </div>
              <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
                <form id="kt_modal_update_password_form" className="form" action="#">
                  <div className="fv-row mb-10">
                    <label className="required form-label fs-6 mb-2">Mot de passe actuel</label>
                    <input className="form-control form-control-lg form-control-solid" type="password" placeholder="" name="current_password" autoComplete="off" />
                  </div>
                  <div className="mb-10 fv-row" data-kt-password-meter="true">
                    <div className="mb-1">
                      <label className="form-label fw-semibold fs-6 mb-2">Nouveau mot de passe</label>
                      <div className="position-relative mb-3">
                        <input className="form-control form-control-lg form-control-solid" type="password" placeholder="" name="new_password" autoComplete="off" />
                        <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" data-kt-password-meter-control="visibility">
                          <i className="ki-outline ki-eye-slash fs-1"></i>
                          <i className="ki-outline ki-eye d-none fs-1"></i>
                        </span>
                      </div>
                      <div className="d-flex align-items-center mb-3" data-kt-password-meter-control="highlight">
                        <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                        <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                        <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                        <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
                      </div>
                    </div>
                    <div className="text-muted">Le mot de passe est compris entre 6 et 8 caractères et peut contenir des lettres, des numéros et des symboles.</div>
                  </div>
                  <div className="fv-row mb-10">
                    <label className="form-label fw-semibold fs-6 mb-2">Confirmez le mot de passe</label>
                    <input className="form-control form-control-lg form-control-solid" type="password" placeholder="" name="confirm_password" autoComplete="off" />
                  </div>
                  <div className="text-center pt-15">
                    <button type="reset" className="btn btn-light me-3" data-kt-users-modal-action="cancel">Discard</button>
                    <button type="submit" className="btn btn-primary" data-kt-users-modal-action="submit">
                      <span className="indicator-label">Submit</span>
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
    </>
  )
}

export default Profil