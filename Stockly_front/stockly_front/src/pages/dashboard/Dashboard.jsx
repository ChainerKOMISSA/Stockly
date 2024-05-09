import React, { useState, useEffect, useContext } from 'react'
import { API_URL } from '../../components/constantes';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

function Dashboard() {
  const [nbrupture, setNbrupture] = useState([]);
  const [sumdepenses, setSumdepenses] = useState([]);
  const [sumventes, setSumventes] = useState([]);
  const [nbproduits, setNbProduits] = useState([]);
  const { userData } = useUser();

  console.log(userData);

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
  }, []);

  // Somme des ventes
  useEffect(() => {
    fetch(`${API_URL}/produitvente/total`)
      .then(response => response.json())
      .then(data => {
        setSumventes(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques des ventes: ', error)
      })
  }, []);

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
  }, []);


  // Somme des dépenses
  useEffect(() => {
    fetch(`${API_URL}/produits/count`)
      .then(response => response.json())
      .then(data => {
        setNbProduits(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques du nombre des produits: ', error)
      })
  }, []);


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
        <div class="row g-5 g-xl-8">
          <div class="col-xl-3">
            <Link to="/sales">
              <a href="#" class="card bg-light-success hoverable card-xl-stretch mb-xl-8 hover-scale">
                <div class="card-body">
                  <i class="ki-outline ki-basket text-success fs-2x ms-n1"></i>
                  <div class="fw-bold text-gray-900 fs-1 mb-2 mt-5">{sumventes.somme} <span className="fw-semibold text-muted fs-7">FCFA</span></div>
                  <div class="fw-semibold text-success">Ventes réalisées</div>
                </div>
              </a>
            </Link>
          </div>
          <div class="col-xl-3">
            <Link to="/depenses">
              <a href="#" class="card bg-light-warning hoverable card-xl-stretch mb-xl-8 hover-scale">
                <div class="card-body">
                  <i class="ki-outline ki-chart-line-down text-warning fs-2x ms-n1"></i>
                  <div class="fw-bold text-gray-900 fs-1 mb-2 mt-5">{sumdepenses.somme} <span className="fw-semibold text-muted fs-7">FCFA</span></div>
                  <div class="fw-semibold text-warning">Dépenses effectuées</div>
                </div>
              </a>
            </Link>
          </div>
          <div class="col-xl-3">
            <Link to="/rupture">
              <a href="#" class="card bg-light-danger hoverable card-xl-stretch mb-xl-8 hover-scale">
                <div class="card-body">
                  <i class="ki-outline ki-information-2 text-danger fs-2x ms-n1"></i>
                  <div class="fw-bold text-gray-900 fs-1 mb-2 mt-5">{nbrupture.nbRupture} <span className="fw-semibold text-muted fs-7">produits</span></div>
                  <div class="fw-semibold text-danger">Alerte stock</div>
                </div>
              </a>
            </Link>
          </div>
          <div class="col-xl-3">
            <Link to="/liquidation">
              <a href="#" class="card bg-light-danger hoverable card-xl-stretch mb-xl-8 hover-scale">
                <div class="card-body">
                  <i class="ki-outline ki-information-2 text-danger fs-2x ms-n1"></i>
                  <div class="fw-semibold text-danger fs-1 mb-2 mt-5">Produits à liquider</div>
                  {/* <div class="fw-semibold text-info">Produits à liquider</div> */}
                </div>
              </a>
            </Link>
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

        <div class="row">
          <div class="card card-xl-stretch mb-5 mb-xl-8">
            <div class="card-header border-0 pt-5">
              <h3 class="card-title align-items-start flex-column">
                <span class="card-label fw-bold fs-3 mb-1">Ventes réalisées</span>
                <span class="text-muted fw-semibold fs-7">Plus de ... ventes</span>
              </h3>
              <div class="card-toolbar">
                <select name="" id="" class="btn btn-sm btn-light-primary px-4 me-1">
                  <option value="1">Janvier</option>
                  <option value="2">Février</option>
                  <option value="3">Mars</option>
                  <option value="4">Avril</option>
                  <option value="5">Mai</option>
                  <option value="6">Juin</option>
                  <option value="7">Juillet</option>
                  <option value="8">Août</option>
                  <option value="9">Septembre</option>
                  <option value="10">Octobre</option>
                  <option value="11">Novembre</option>
                  <option value="12">Décembre</option>
                </select>
              </div>
            </div>
            <div class="card-body">
              <div id="graphe_ventes" style={{ height: '350px' }}></div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Dashboard