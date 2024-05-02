import React, { useState, useEffect } from 'react'
import { API_URL } from '../../components/constantes';



function Dashboard() {
  const [nbrupture, setNbrupture] = useState([]);
  const [sumdepenses, setSumdepenses] = useState([]);
  const [sumventes, setSumventes] = useState([]);


  // Somme des dépenses
  useEffect(() => {
    fetch(`${API_URL}/depenses/total`)
      .then(response => response.json())
      .then(data => {
        setSumdepenses(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques des dépenses: ', error)
      })
  });

  // Somme des ventes
  useEffect(() => {
    fetch(`${API_URL}/produitvente/total`)
      .then(response => response.json())
      .then(data => {
        setSumventes(data)
        // console.log(sumventes);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques des ventes: ', error)
      })
  });

  // Somme des dépenses
  useEffect(() => {
    fetch(`${API_URL}/produits/countrupture`)
      .then(response => response.json())
      .then(data => {
        setNbrupture(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques du nombre des ruptures: ', error)
      })
  });


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
            </ul>
            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Tableau de bord</h1>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content">
        <div className="row g-5 g-xl-8">
          <div className="col-xl-4">
            <div className="card bg-light-success card-xl-stretch mb-xl-8">
              <div className="card-body my-3">
                <a href="/sales" className="card-title fw-bold text-success fs-5 mb-3 d-block">Ventes réalisées</a>
                <div className="py-1">
                  <span className="text-gray-900 fs-1 fw-bold me-2">{sumventes.somme}</span>
                  <span className="fw-semibold text-muted fs-7">FCFA</span>
                </div>
                <div className="progress h-7px bg-success bg-opacity-50 mt-7">
                  <div className="progress-bar bg-success" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card bg-light-warning card-xl-stretch mb-xl-8">
              <div className="card-body my-3">
                <a href="#" className="card-title fw-bold text-warning fs-5 mb-3 d-block">Dépenses effectuées</a>
                <div className="py-1">
                  <span className="text-gray-900 fs-1 fw-bold me-2">{sumdepenses.somme}</span>
                  <span className="fw-semibold text-muted fs-7">FCFA</span>
                </div>
                <div className="progress h-7px bg-warning bg-opacity-50 mt-7">
                  <div className="progress-bar bg-warning" role="progressbar" style={{ width: "15%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card bg-light-danger card-xl-stretch mb-5 mb-xl-8">
              <div className="card-body my-3">
                <a href="/rupture" className="card-title fw-bold text-danger fs-5 mb-3 d-block">Alerte stock</a>
                <div className="py-1">
                  <span className="text-gray-900 fs-1 fw-bold me-2">{nbrupture.nbRupture}</span>
                  <span className="fw-semibold text-muted fs-7">produit(s)</span>
                </div>
                <div className="progress h-7px bg-danger bg-opacity-50 mt-7">
                  <div className="progress-bar bg-danger" role="progressbar" style={{ width: "76%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card bg-light-danger card-xl-stretch mb-5 mb-xl-8">
              <div className="card-body my-4">
                <i className="ki-outline text-danger ki-information-3 fs-2qx"></i> <a href="/liquidation" className="card-title fw-bold text-danger fs-5 mb-3 d-block">Produits à liquider</a>
                {/* <div className="py-1">
                  <span className="text-gray-900 fs-1 fw-bold me-2"></span>
                  <span className="fw-semibold text-muted fs-7"></span>
                </div> */}
                {/* <div className="progress h-7px bg-danger bg-opacity-50 mt-7">
                  <div className="progress-bar bg-danger" role="progressbar" style={{ width: "76%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <ul className="nav nav-pills nav-pills-custom mb-3">
          <li className="nav-item mb-3 me-3 me-lg-6">
            <a className="nav-link d-flex justify-content-between flex-column flex-center overflow-hidden w-80px h-85px py-4" data-bs-toggle="pill" href="#kt_stats_widget_1_tab_2">
              <div className="nav-icon">
              <i className="ki-outline ki-cube-2 text-gray-700 fs-2x"></i>
              </div>
              <span className="nav-text text-gray-700 fw-bold fs-6 lh-1">Produits</span>
            </a>
          </li>
          <li className="nav-item mb-3 me-3 me-lg-6">
            <a className="nav-link d-flex justify-content-between flex-column flex-center overflow-hidden w-80px h-85px py-4" data-bs-toggle="pill" href="#kt_stats_widget_1_tab_2">
              <div className="nav-icon">
              <i className="ki-outline ki-abstract-28 text-gray-700 fs-2x"></i>
              </div>
              <span className="nav-text text-gray-700 fw-bold fs-6 lh-1">Catégories</span>
            </a>
          </li>
          <li className="nav-item mb-3 me-3 me-lg-6">
            <a className="nav-link d-flex justify-content-between flex-column flex-center overflow-hidden w-80px h-85px py-4" data-bs-toggle="pill" href="#kt_stats_widget_1_tab_2">
              <div className="nav-icon">
              <i className="ki-outline ki-basket-ok text-gray-700 fs-2x"></i>
              </div>
              <span className="nav-text text-gray-700 fw-bold fs-6 lh-1">Ventes</span>
            </a>
          </li>
          <li className="nav-item mb-3 me-3 me-lg-6">
            <a className="nav-link d-flex justify-content-between flex-column flex-center overflow-hidden w-80px h-85px py-4" data-bs-toggle="pill" href="#kt_stats_widget_1_tab_2">
              <div className="nav-icon">
              <i className="ki-outline ki-files-tablet text-gray-700 fs-2x"></i>
              </div>
              <span className="nav-text text-gray-700 fw-bold fs-6 lh-1">Commandes</span>
            </a>
          </li>
          <li className="nav-item mb-3 me-3 me-lg-6">
            <a className="nav-link d-flex justify-content-between flex-column flex-center overflow-hidden w-80px h-85px py-4" data-bs-toggle="pill" href="#kt_stats_widget_1_tab_2">
              <div className="nav-icon">
              <i className="ki-outline ki-tablet-ok text-gray-700 fs-2x"></i>
              </div>
              <span className="nav-text text-gray-700 fw-bold fs-6 lh-1">Livraisons</span>
            </a>
          </li>
          <li className="nav-item mb-3 me-3 me-lg-6">
            <a className="nav-link d-flex justify-content-between flex-column flex-center overflow-hidden w-80px h-85px py-4" data-bs-toggle="pill" href="#kt_stats_widget_1_tab_2">
              <div className="nav-icon">
              <i className="ki-outline ki-delivery-2 text-gray-700 fs-2x"></i>
              </div>
              <span className="nav-text text-gray-700 fw-bold fs-6 lh-1">Fournisseurs</span>
            </a>
          </li>
          <li className="nav-item mb-3 me-3 me-lg-6">
            <a className="nav-link d-flex justify-content-between flex-column flex-center overflow-hidden w-80px h-85px py-4" data-bs-toggle="pill" href="#kt_stats_widget_1_tab_2">
              <div className="nav-icon">
              <i className="ki-outline ki-profile-user text-gray-700 fs-2x"></i>
              </div>
              <span className="nav-text text-gray-700 fw-bold fs-6 lh-1">Employés</span>
            </a>
          </li>
          <li className="nav-item mb-3 me-3 me-lg-6">
            <a className="nav-link d-flex justify-content-between flex-column flex-center overflow-hidden w-80px h-85px py-4" data-bs-toggle="pill" href="#kt_stats_widget_1_tab_2">
              <div className="nav-icon">
              <i className="ki-outline ki-wallet text-gray-700 fs-2x"></i>
              </div>
              <span className="nav-text text-gray-700 fw-bold fs-6 lh-1">Dépenses</span>
            </a>
          </li>
          <li className="nav-item mb-3 me-3 me-lg-6">
            <a className="nav-link d-flex justify-content-between flex-column flex-center overflow-hidden w-80px h-85px py-4" data-bs-toggle="pill" href="#kt_stats_widget_1_tab_2">
              <div className="nav-icon">
              <i className="ki-outline ki-information-3 text-gray-700 fs-2x"></i>
              </div>
              <span className="nav-text text-gray-700 fw-bold fs-6 lh-1">Incidents</span>
            </a>
          </li>
        </ul> */}
      </div>
    </>
  )
}

export default Dashboard