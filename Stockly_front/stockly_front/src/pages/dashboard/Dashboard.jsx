import React, { useState, useEffect, useContext } from 'react'
import { API_URL } from '../../components/constantes';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Doughnut, Line, Bar, PolarArea, Pie } from "react-chartjs-2";
import { failureAlert, infoAlert } from '../../components/alerts';
import { formatNumber } from '../../helpers/functions';

function Dashboard() {
  const [nbrupture, setNbrupture] = useState([]);
  const [sumdepenses, setSumdepenses] = useState([]);
  const [sumventes, setSumventes] = useState([]);
  const [sumcommandes, setSumCommandes] = useState([]);
  const [nbproduits, setNbProduits] = useState([]);
  const [nbliquidation, setNbLiquidation] = useState([]);
  const [venteparjour, setVenteparJour] = useState([]);
  const [chartData, setChartData] = useState({});
  const { userData } = useUser();

  ChartJS.register(ArcElement, Tooltip, Legend);



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

  // Somme des commandes
  useEffect(() => {
    fetch(`${API_URL}/produitcommande/total`)
      .then(response => response.json())
      .then(data => {
        setSumCommandes(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques des commandes: ', error)
      })
  }, []);

  // Somme des dépenses
  useEffect(() => {
    fetch(`${API_URL}/produits/countrupture`)
      .then(response => response.json())
      .then(data => {
        setNbrupture(data)
        console.log(nbrupture);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques du nombre des ruptures: ', error)
      })
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/produits/countliquidation`)
      .then(response => response.json())
      .then(data => {
        setNbLiquidation(data)
        console.log(nbliquidation);
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
        // console.log(nbproduits);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques du nombre des produits: ', error)
      })
  }, []);

  // Requête pour obtenir les 5 produits les plus vendus
  // useEffect(() => {
  //   fetch(`${API_URL}/ventes/top-produits`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setChartData(data)
  //       console.log(chartData);
  //     })
  //     .catch(error => {
  //       console.error('Erreur lors de la récupération des produits les plus vendus: ', error);
  //     });
  // }, []);


  function getChiffreAffaire(ventes, commandes, depenses) {
    // Checking if all necessary data is available
    if (ventes !== undefined && commandes !== undefined && depenses !== undefined) {
      // Calculating the total expenses and commands
      let depensetotal = parseFloat(depenses) + parseFloat(commandes);
      // Calculating the gross profit
      let ca = parseFloat(ventes) - depensetotal;
      return ca >= 0 ? ca : 0; // Ensuring positive value, returning 0 if negative
    } else {
      return 0; // Returning 0 if any of the data is missing
    }
  }

  const handleMonthSelect = (month) => {
    const selectedMonth = month.target.value;
    console.log('Selected month: ', selectedMonth);
    updateChart(selectedMonth);
  }


  // Fonction pour mettre à jour les données du graphique
  const updateChart = async (month) => {
    try {
      const response = await fetch(`${API_URL}/produitvente/totalbyjour`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ month: month }),
      });

      if (response.ok) {
        const data = await response.json();
        setVenteparJour(data.dataTotal);
        console.log(venteparjour);
      } else {
        const errorData = await response.json();
        console.log(errorData);
        failureAlert(errorData.message);
      }
    } catch (error) {
      console.log(error);
      failureAlert(error.message);
    }
  }

  let dates = [];
  let total = [];
  if (venteparjour) {
    for (let key in venteparjour) {
      dates.push(venteparjour[key].DateOfSale);
      total.push(venteparjour[key].TOTAL)
    }
  }

  let produitchart = [];
  if (nbproduits && nbrupture) {
    for (let key in nbproduits) {
      produitchart.push(nbproduits.count);
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
            </ul>
            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Tableau de bord</h1>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content">
        <div className="row g-5 g-xl-8">
          <div className="col-xl-3">
            <Link to="/sales">
              <a href="#" className="card bg-light-success hoverable card-xl-stretch mb-xl-8 hover-scale">
                <div className="card-body">
                  <i className="ki-outline ki-basket text-success fs-2x ms-n1"></i>
                  <div className="fw-bold text-gray-900 fs-1 mb-2 mt-5">{formatNumber(sumventes.somme)} <span className="fw-semibold text-muted fs-7">FCFA</span></div>
                  <div className="fw-semibold text-success">Ventes réalisées</div>
                </div>
              </a>
            </Link>
          </div>
          <div className="col-xl-3">
            <Link to="/depenses">
              <a href="#" className="card bg-light-warning hoverable card-xl-stretch mb-xl-8 hover-scale">
                <div className="card-body">
                  <i className="ki-outline ki-chart-line-down text-warning fs-2x ms-n1"></i>
                  <div className="fw-bold text-gray-900 fs-1 mb-2 mt-5">{formatNumber(sumdepenses.somme)} <span className="fw-semibold text-muted fs-7">FCFA</span></div>
                  <div className="fw-semibold text-warning">Dépenses effectuées</div>
                </div>
              </a>
            </Link>
          </div>
          <div className="col-xl-3">
            <Link to="/orders">
              <a href="#" className="card bg-light-primary hoverable card-xl-stretch mb-xl-8 hover-scale">
                <div className="card-body">
                  <i className="ki-outline ki-cheque text-primary fs-2x ms-n1"></i>
                  <div className="fw-bold text-gray-900 fs-1 mb-2 mt-5">{formatNumber(sumcommandes.somme)} <span className="fw-semibold text-muted fs-7">FCFA</span></div>
                  <div className="fw-semibold text-primary">Commandes effectuées</div>
                </div>
              </a>
            </Link>
          </div>
          <div className="col-xl-3">
            <Link to="/rupture">
              <a href="#" className="card bg-light-danger hoverable card-xl-stretch mb-xl-8 hover-scale">
                <div className="card-body">
                  <i className="ki-outline ki-information-2 text-danger fs-2x ms-n1"></i>
                  <div className="fw-bold text-gray-900 fs-1 mb-2 mt-5">{nbrupture.nbRupture}<span className="fw-semibold text-muted fs-7"> produits</span></div>
                  <div className="fw-semibold text-danger">Alerte stock</div>
                </div>
              </a>
            </Link>
          </div>
          <div className="col-xl-3">
            <Link to="/liquidation">
              <a href="#" className="card bg-light-danger hoverable card-xl-stretch mb-xl-8 hover-scale">
                <div className="card-body">
                  <i className="ki-outline ki-information-2 text-danger fs-2x ms-n1"></i>
                  <div className="fw-semibold text-danger fs-1 mb-2 mt-5">Produits à liquider</div>
                  {/* <div className="fw-semibold text-info">Produits à liquider</div> */}
                </div>
              </a>
            </Link>
          </div>
          <div className="col-xl-3">
            <a className="card bg-light hoverable card-xl-stretch mb-xl-8 hover-scale">
              <div className="card-header border-0 py-5 ribbon ribbon-top ribbon-vertical">
                <div className="ribbon-label bg-success">
                  <i className="ki-outline ki-chart-line-up text-inverse-success fs-1"></i>
                </div>
                <h3 className="card-title align-items-start flex-column">
                  <span className="fw-semibold text-dark fs-5">Chiffre d'affaire actuel</span>
                </h3>
              </div>
              <div className="card-body d-flex flex-column">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center">
                    <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">{formatNumber(getChiffreAffaire(sumventes.somme, sumcommandes.somme, sumdepenses.somme))}</span>
                    <span className="fs-4 fw-semibold text-gray-500 me-1 align-self-start">FCFA</span>
                  </div>
                </div>
              </div>
            </a>
          </div>

        </div>

        <div className="row">
          <div className="card card-xl-stretch mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">Ventes réalisées</span>
                <span className="text-muted fw-semibold fs-7">Veuillez choisir un mois pour voir les ventes</span>
              </h3>
              <div className="card-toolbar">
                <div className="input-group mb-5">
                  <span className="input-group-text"><i className='ki-outline ki-calendar fs-2'></i></span>
                  <select name="select_month" id="select_month" className="form-control" onChange={(month) => handleMonthSelect(month)}>
                    <option value="" selected disabled>Sélectionnez un mois ...</option>
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
            </div>
            <div className="card-body">
              {
                venteparjour ? (
                  // Si des données de vente par jour sont disponibles
                  <div>
                    <Line
                      data={{
                        labels: dates,
                        datasets: [
                          {
                            label: 'Ventes mensuelles',
                            data: total
                          }
                        ],
                      }}
                    />
                  </div>
                ) : (
                  infoAlert("Aucune vente disponible pour ce mois!")
                )
              }
            </div>
          </div>
        </div>

        <div className="row g-5 g-xl-8">
          <div className="col-xl-6">
            <div className="card card-xl-stretch mb-xl-8" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
              <div className="card-header border-0 py-5">
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bold fs-3 mb-1">Etat actuel du stock</span>
                  <span className="text-muted fw-semibold fs-7">Ce graphe est mis à jour automatiquement et affiche les valeurs en temps réel</span>
                </h3>
              </div>
              <div className="card-body">
                <div>
                  {
                    nbproduits ? (
                      nbrupture ? (
                        <Doughnut
                          data={{
                            labels: ['Produits', 'Produits en rupture', 'Produits périmés'],
                            datasets: [
                              {
                                label: 'Nombre',
                                data: [nbproduits.count, nbrupture.nbRupture, nbliquidation.count],
                                backgroundColor: ['rgb(0,191,255)', 'rgb(255,127,80)', 'rgb(255,0,0)']
                              }
                            ],
                          }}
                        />
                      ) : (
                        infoAlert("Aucun produit en rupture")
                      )
                    ) : (
                      infoAlert("Aucun produit disponible")
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card card-xl-stretch mb-5 mb-xl-8">
              <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bold fs-3 mb-1">Nos 5 produits les plus vendus</span>
                  {/* <span className="text-muted fw-semibold fs-7">Plus de ... ventes</span> */}
                </h3>
              </div>
              <div className="card-body">
                {/* <div>
                  {
                    chartData ? (
                      <Pie
                        data={{
                          labels: [chartData.nom],
                          datasets: [
                            {
                              label: 'Nombre',
                              data: [nbproduits.count, nbrupture.nbRupture, nbliquidation.count],
                              backgroundColor: ['rgb(0,191,255)', 'rgb(255,127,80)', 'rgb(255,0,0)']
                            }
                          ],
                        }} />

                    ) : (
                      <p>Chargement des données ...</p>
                    )
                  }
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard