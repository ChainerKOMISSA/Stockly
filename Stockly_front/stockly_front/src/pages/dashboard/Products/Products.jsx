import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../../components/constantes'
import { createSuccessAlert, failureAlert, updateSuccessAlert, deleteSuccessAlert, infoAlert } from '../../../components/alerts'
import { getCurrentDate } from '../../../helpers/CalendarControl'
import { formatDate, formatDate2 } from '../../../helpers/DateFormat'
import Swal from 'sweetalert2'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import ListeProduitsGenerator from './ListeProduitsGenerator'

function Products() {
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({})



  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then(response => response.json())
      .then(data => {
        setCategories(data)
      })
      .catch(error => {
        console.log('Erreur lors de la récupération des catégories: ', error);
      })
  })

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
      const response = await fetch(`${API_URL}/produits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        createSuccessAlert();
        navigate(0)
      } else {
        const errorData = await response.json();
        failureAlert(errorData)
      }
    } catch (error) {
      failureAlert(error);
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
      const response = await fetch(`${API_URL}/produits/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        deleteSuccessAlert()
        navigate(0)
      } else {
        const errorData = await response.json();
        failureAlert(errorData)
      }
    } catch (error) {
      failureAlert(error);
    }
  }

  const handleProductSelection = (productId) => {
    fetch(`${API_URL}/produits/${productId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        return response.json();
      })
      .then(produCtDetails => {
        setSelectedProduct(produCtDetails);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails du produit:', error);
      });
  };


  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  }

  useEffect(() => {
    if (selectedProduct) {
      setUpdatedData({
        id: selectedProduct.id,
        idCategorie: selectedProduct.idCategorie,
        nom: selectedProduct.nom,
        prix: selectedProduct.prix,
        quantiteStock: selectedProduct.quantiteStock,
        datePeremption: selectedProduct.datePeremption,
      });
    }
  }, [selectedProduct]);

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/produits/${id}`, {
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


  useEffect(() => {
    fetch(`${API_URL}/produits`)
      .then(response => response.json())
      .then(data => {
        setProduits(data)
        let liste = [];
        data.forEach(element => {
          liste.push({
            "id": element.id,
            "idCategorie": element.idCategorie,
            "nom": element.nom
          });
        });
        searchProduitsByCategorie(liste);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des produits: ', error)
      })
  }, []);


  const handlePDFDownload = () => {
    const pdfData = ListeProduitsGenerator(produits);
    console.log(pdfData);
  };

  const Search = () => {
    const selectCategorie = document.getElementById('selectCategorie').value;
    const selectProduit = document.getElementById('selectProduit').value;
    const table = document.getElementById('tableProduits');

    // Nettoyer la table avant d'ajouter de nouvelles lignes
    table.innerHTML = '';
    const titles = document.createElement('tr');
    titles.className = "fw-bold text-muted";

    const thNum = document.createElement('th');
    thNum.textContent = "#";
    thNum.className = 'w-25px'
    titles.appendChild(thNum);

    const thCategorie = document.createElement('th');
    thCategorie.textContent = "Catégorie";
    thCategorie.className = 'min-w-200px'
    titles.appendChild(thCategorie);

    const thProduit = document.createElement('th');
    thProduit.textContent = "Produit";
    thProduit.className = 'min-w-300px'
    titles.appendChild(thProduit);

    const thPrix = document.createElement('th');
    thPrix.textContent = "Prix (CFA)";
    thPrix.className = 'min-w-100px'
    titles.appendChild(thPrix);

    const thQuantité = document.createElement('th');
    thQuantité.textContent = "Quantité";
    thQuantité.className = 'min-w-100px'
    titles.appendChild(thQuantité);

    const thPéremption = document.createElement('th');
    thPéremption.textContent = "Péremption";
    thPéremption.className = 'min-w-100px'
    titles.appendChild(thPéremption);

    const thActions = document.createElement('th');
    thActions.textContent = "Actions";
    thActions.className = 'min-w-100px text-end'
    titles.appendChild(thActions);


    table.appendChild(titles);

    // Vérifiez qu'un produit a été choisi
    if (selectCategorie && selectProduit) {
      // Filtrer les produits en fonction des sélections de catégorie et de produit
      let result = produits.filter((item) => item.Categorie.id == selectCategorie && item.id == selectProduit);
      // Ajouter une ligne pour chaque produit filtré
      let index = 0;
      result.forEach(produit => {
        const ligne = document.createElement('tr');

        // Ajouter une cellule pour chaque propriété du produit
        const cellNum = document.createElement('td');
        cellNum.textContent = index += 1;
        ligne.appendChild(cellNum);

        const cellCategorie = document.createElement('td');
        cellCategorie.textContent = produit.Categorie.libelle;
        cellCategorie.className = 'text-gray-900 fw-bold text-hover-primary fs-6'; // Ajout de la classe Bootstrap
        ligne.appendChild(cellCategorie);

        const cellNom = document.createElement('td');
        cellNom.textContent = produit.nom;
        cellNom.className = 'text-gray-900 fw-bold text-hover-primary fs-6'; // Ajout de la classe Bootstrap
        ligne.appendChild(cellNom);

        const cellPrix = document.createElement('td');
        cellPrix.textContent = produit.prix;
        cellPrix.className = 'text-gray-700 fw-bold text-hover-primary fs-6'; // Ajout de la classe Bootstrap
        ligne.appendChild(cellPrix);

        const cellQuantiteStock = document.createElement('td');
        cellQuantiteStock.textContent = produit.quantiteStock;
        cellQuantiteStock.className = 'text-gray-700 fw-bold text-hover-primary fs-6'; // Ajout de la classe Bootstrap
        ligne.appendChild(cellQuantiteStock);

        const cellDatePeremption = document.createElement('td');
        cellDatePeremption.textContent = formatDate(produit.datePeremption);
        cellDatePeremption.className = 'text-gray-700 fw-bold text-hover-primary fs-6'; // Ajout de la classe Bootstrap
        ligne.appendChild(cellDatePeremption);

        const cellBoutons = document.createElement('td');
        cellBoutons.className = 'text-end';
        cellBoutons.innerHTML = `
        <div class="d-flex justify-content-end flex-shrink-0">
          <a href="#" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            data-bs-toggle="modal" data-bs-target="#kt_modal_edit"
            onClick={() => handleProductSelection(produit.id)}>
            <i class="ki-outline ki-pencil fs-2"></i>
          </a>
          <a href="#" class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
            onClick={(e) => confirmDelete(produit.id)}>
            <i class="ki-outline ki-trash fs-2"></i>
          </a>
        </div>
      `;
        ligne.appendChild(cellBoutons);


        // Ajouter la ligne à la table
        table.appendChild(ligne);
      });
    } else if (selectCategorie) {
      // Filtrer les produits en fonction des sélections de catégorie et de produit
      let result = produits.filter((item) => item.Categorie.id == selectCategorie);
      // Ajouter une ligne pour chaque produit filtré
      let index = 0;
      result.forEach(produit => {
        const ligne = document.createElement('tr');

        // Ajouter une cellule pour chaque propriété du produit
        const cellNum = document.createElement('td');
        cellNum.textContent = index += 1;
        ligne.appendChild(cellNum);

        const cellCategorie = document.createElement('td');
        cellCategorie.textContent = produit.Categorie.libelle;
        cellCategorie.className = 'text-gray-900 fw-bold text-hover-primary fs-6'; // Ajout de la classe Bootstrap
        ligne.appendChild(cellCategorie);

        const cellNom = document.createElement('td');
        cellNom.textContent = produit.nom;
        cellNom.className = 'text-gray-900 fw-bold text-hover-primary fs-6'; // Ajout de la classe Bootstrap
        ligne.appendChild(cellNom);

        const cellPrix = document.createElement('td');
        cellPrix.textContent = produit.prix;
        cellPrix.className = 'text-gray-700 fw-bold text-hover-primary fs-6'; // Ajout de la classe Bootstrap
        ligne.appendChild(cellPrix);

        const cellQuantiteStock = document.createElement('td');
        cellQuantiteStock.textContent = produit.quantiteStock;
        cellQuantiteStock.className = 'text-gray-700 fw-bold text-hover-primary fs-6'; // Ajout de la classe Bootstrap
        ligne.appendChild(cellQuantiteStock);

        const cellDatePeremption = document.createElement('td');
        cellDatePeremption.textContent = formatDate(produit.datePeremption);
        cellDatePeremption.className = 'text-gray-700 fw-bold text-hover-primary fs-6'; // Ajout de la classe Bootstrap
        ligne.appendChild(cellDatePeremption);

        const cellBoutons = document.createElement('td');
        cellBoutons.className = 'text-end';
        cellBoutons.innerHTML = `
        <div class="d-flex justify-content-end flex-shrink-0">
          <a href="#" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            data-bs-toggle="modal" data-bs-target="#kt_modal_edit"
            onClick={() => handleProductSelection(produit.id)}>
            <i class="ki-outline ki-pencil fs-2"></i>
          </a>
          <a href="#" class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
            onClick={(e) => confirmDelete(produit.id)}>
            <i class="ki-outline ki-trash fs-2"></i>
          </a>
        </div>
      `;
        ligne.appendChild(cellBoutons);


        // Ajouter la ligne à la table
        table.appendChild(ligne);
      });
    } else if (selectProduit) {
      // Filtrer les produits en fonction des sélections de catégorie et de produit
      let result = produits.filter((item) => item.id == selectProduit);
      // Ajouter une ligne pour chaque produit filtré
      let index = 0;
      result.forEach(produit => {
        const ligne = document.createElement('tr');

        // Ajouter une cellule pour chaque propriété du produit
        const cellNum = document.createElement('td');
        cellNum.textContent = index += 1;
        ligne.appendChild(cellNum);

        const cellCategorie = document.createElement('td');
        cellCategorie.textContent = produit.Categorie.libelle;
        cellCategorie.className = 'text-gray-900 fw-bold text-hover-primary fs-6'; // Ajout de la classe Bootstrap
        ligne.appendChild(cellCategorie);

        const cellNom = document.createElement('td');
        cellNom.textContent = produit.nom;
        cellNom.className = 'text-gray-900 fw-bold text-hover-primary fs-6'; // Ajout de la classe Bootstrap
        ligne.appendChild(cellNom);

        const cellPrix = document.createElement('td');
        cellPrix.textContent = produit.prix;
        cellPrix.className = 'text-gray-700 fw-bold text-hover-primary fs-6'; // Ajout de la classe Bootstrap
        ligne.appendChild(cellPrix);

        const cellQuantiteStock = document.createElement('td');
        cellQuantiteStock.textContent = produit.quantiteStock;
        cellQuantiteStock.className = 'text-gray-700 fw-bold text-hover-primary fs-6'; // Ajout de la classe Bootstrap
        ligne.appendChild(cellQuantiteStock);

        const cellDatePeremption = document.createElement('td');
        cellDatePeremption.textContent = formatDate(produit.datePeremption);
        cellDatePeremption.className = 'text-gray-700 fw-bold text-hover-primary fs-6'; // Ajout de la classe Bootstrap
        ligne.appendChild(cellDatePeremption);

        const cellBoutons = document.createElement('td');
        cellBoutons.className = 'text-end';
        cellBoutons.innerHTML = `
  <div class="d-flex justify-content-end flex-shrink-0">
    <a href="#" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
      data-bs-toggle="modal" data-bs-target="#kt_modal_edit"
      onClick={() => handleProductSelection(produit.id)}>
      <i class="ki-outline ki-pencil fs-2"></i>
    </a>
    <a href="#" class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
      onClick={(e) => confirmDelete(produit.id)}>
      <i class="ki-outline ki-trash fs-2"></i>
    </a>
  </div>
`;
        ligne.appendChild(cellBoutons);

        // Ajouter la ligne à la table
        table.appendChild(ligne);
      });
    } else {
      infoAlert("Vous devez sélectionner une catégorie ou un produit!");
    }
  }

  function searchProduitsByCategorie(produits) {
    // Récupération des éléments DOM
    const selectCategorie = document.getElementById('selectCategorie');
    const selectProduit = document.getElementById('selectProduit');

    // Écouteur d'événements pour le changement de sélection de catégorie
    selectCategorie.addEventListener('change', function () {
      const selectedCategorieId = this.value; // Récupérer l'ID de la catégorie sélectionnée

      // Filtrer les produits en fonction de la catégorie sélectionnée
      let filteredProduits = produits.filter(element => element.idCategorie == selectedCategorieId);

      // Mettre à jour les options du select des produits
      selectProduit.innerHTML = '<option value="">Produits</option>'; // Réinitialiser les options du select

      filteredProduits.forEach(produit => {
        const option = document.createElement('option');
        option.value = produit.id;
        option.textContent = produit.nom;
        selectProduit.appendChild(option);
      });
    });
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
              <li className="breadcrumb-item text-gray-500 mx-n1">Produits</li>
            </ul>
            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Liste des produits</h1>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content">
        <div className="card card-flush pb-0 bgi-position-y-center bgi-no-repeat mb-10" style={{ backgroundSize: "auto calc(100% + 10rem)", backgroundPositionX: "100%" }}>
          <div className="card-header pt-10">
            <div className="d-flex align-items-center">
              <div className="symbol symbol-circle me-5"></div>
              <div className="d-flex flex-column">
                <h2 className="mb-1">Filtre de recherche de produits</h2>
                <div className="text-muted">Effectuer une rechercher par ...</div> <br />
                <div className='row'>
                  <div className='col'>
                    <select id="selectCategorie" className="form-select form-select-solid" data-kt-ecommerce-settings-type="select2_flags" data-placeholder="Catégorie" name='searchCategorie'>
                      <option value="">Catégorie</option>
                      {
                        categories.map((categorie, index) => (
                          <option key={index} value={categorie.id}>{categorie.libelle}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='col'>
                    <select id="selectProduit" className="form-select form-select-solid" data-kt-ecommerce-settings-type="select2_flags" data-placeholder="Catégorie" name='searchProduit'>
                      <option value="">Produits</option>
                      {
                        produits.map((produit, index) => (
                          <option key={index} value={produit.id}>{produit.nom}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='col'>
                    <a className="btn btn-sm btn-light-primary" onClick={Search}>
                      <i className="ki-outline ki-magnifier fs-2"></i>
                      Rechercher
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body pb-0"></div>
        </div>
        <div className="card mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            {/* <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">Members Statistics</span>
              <span className="text-muted mt-1 fw-semibold fs-7">Over 500 members</span>
            </h3> */}
            <div className="card-toolbar align-items-center gap-2 gap-lg-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to add a user">
              <a href="#" className="btn btn-sm btn-light btn-active-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_share_earn">
                <i className="ki-outline ki-plus fs-2"></i>
                Nouveau produit
              </a>
              <a className="btn btn-sm btn-light-primary" href='/products/liste'>
                <i className="ki-outline ki-printer fs-2"></i>
                Générer la liste des produits
              </a>
            </div>
          </div>
          <div className="card-body py-3">
            <div className="table-responsive">
              <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4" id='tableProduits'>
                <thead>
                  <tr className="fw-bold text-muted">
                    <th className="w-25px">#</th>
                    <th className="min-w-200px">Catégorie</th>
                    <th className="min-w-300px">Produit</th>
                    <th className="min-w-100px">Prix (CFA)</th>
                    <th className="min-w-100px">Quantité</th>
                    <th className="min-w-100px">Péremption</th>
                    <th className="min-w-100px text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    produits.map((produit, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="d-flex justify-content-start flex-column">
                              <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">{produit.Categorie.libelle}</a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">{produit.nom}</a>
                        </td>
                        <td className="text-end">
                          <div className="d-flex flex-column w-100 me-2">
                            <div className="d-flex flex-stack mb-2">
                              <span className="text-gray-700 fw-bold text-hover-primary d-block fs-6">{produit.prix}</span>
                            </div>
                            {/* <div className="progress h-6px w-100">
                              <div className="progress-bar bg-primary" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                            </div> */}
                          </div>
                        </td>
                        <td className="text-end">
                          <div className="d-flex flex-column w-100 me-2">
                            <div className="d-flex flex-stack mb-2">
                              <span className="text-gray-700 fw-bold text-hover-primary d-block fs-6">{produit.quantiteStock}</span>
                            </div>
                          </div>
                        </td>
                        <td className="text-end">
                          <div className="d-flex flex-column w-100 me-2">
                            <div className="d-flex flex-stack mb-2">
                              <span className="text-gray-700 fw-bold text-hover-primary d-block fs-6">{formatDate(produit.datePeremption)}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex justify-content-end flex-shrink-0">
                            <a href="#"
                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                              data-bs-toggle="modal"
                              data-bs-target="#kt_modal_edit"
                              onClick={() => handleProductSelection(produit.id)}>
                              <i className="ki-outline ki-pencil fs-2"></i>
                            </a>
                            <a href="#" className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm" onClick={(e) => confirmDelete(produit.id)}>
                              <i className="ki-outline ki-trash fs-2"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {/* Create Product Modal */}
              <div className="modal fade" id="kt_modal_share_earn" tabIndex="-1" aria-hidden="true" >
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
                          <h1 className="mb-3">Ajouter un produit</h1>
                          <div className="text-muted fw-semibold fs-5">Entrez les informations pour ajouter le produit.
                          </div>
                        </div>
                        <form id="kt_ecommerce_settings_general_form" className="form">
                          <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Catégorie du produit</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Choisissez une catégorie">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <div className="w-100">
                                  <select id="kt_ecommerce_select2_country" className="form-select form-select-solid" data-kt-ecommerce-settings-type="select2_flags" data-placeholder="Sélectionnez..." onChange={handleChange} name='idCategorie'>
                                    <option value="">Sélectionnez...</option>
                                    {
                                      categories.map((categorie, index) => (
                                        <option key={index} value={categorie.id}>{categorie.libelle}</option>
                                      ))
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Nom du produit</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le nom du produit">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="text" className="form-control form-control-solid" name="nom" value={formData.nom} onChange={handleChange} />
                              </div>
                            </div>
                          </div>
                          <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Prix du produit</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le prix du produit">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="number" className="form-control form-control-solid" name="prix" value={formData.prix} onChange={handleChange} />
                              </div>
                            </div>
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Quantité ajoutée</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez la quantité à ajouter">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="number" min={0} className="form-control form-control-solid" name="quantiteStock" value={formData.quantiteStock} onChange={handleChange} />
                              </div>
                            </div>
                          </div>
                          <div className="fv-row mb-7">
                            <label className="fs-6 fw-semibold form-label mt-3">
                              <span className="required">Date de péremption</span>
                              <span className="ms-1" data-bs-toggle="tooltip" title="Entrez la date de péremption">
                                <i className="ki-outline ki-information fs-7"></i>
                              </span>
                            </label>
                            <input type="date" min={getCurrentDate()} className="form-control form-control-solid" name="datePeremption" value={formData.datePeremption} onChange={handleChange} />
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
              {/* End Create Product Modal */}

              {/* Edit Product Modal */}
              {
                selectedProduct && (
                  <div className="modal fade" id="kt_modal_edit" tabIndex="-1" aria-hidden="true" >
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
                              <h1 className="mb-3">Modifier le produit</h1>
                              <div className="text-muted fw-semibold fs-5">Modifier les informations du produit sélectionné.
                              </div>
                            </div>
                            <form id="kt_ecommerce_settings_general_form" className="form">
                              <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                                <div className="col">
                                  <div className="fv-row mb-7">
                                    <label className="fs-6 fw-semibold form-label mt-3">
                                      <span className="required">Catégorie du produit</span>
                                      <span className="ms-1" data-bs-toggle="tooltip" title="Choisissez une catégorie">
                                        <i className="ki-outline ki-information fs-7"></i>
                                      </span>
                                    </label>
                                    <div className="w-100">
                                      <select id="kt_ecommerce_select2_country" className="form-select form-select-solid" data-kt-ecommerce-settings-type="select2_flags" data-placeholder="Sélectionnez..." onChange={handleUpdateChange} name='idCategorie' value={updatedData.idCategorie}>
                                        <option value="">Sélectionnez...</option>
                                        {
                                          categories.map((categorie, index) => (
                                            <option key={index} value={categorie.id}>{categorie.libelle}</option>
                                          ))
                                        }
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="fv-row mb-7">
                                    <label className="fs-6 fw-semibold form-label mt-3">
                                      <span className="required">Nom du produit</span>
                                      <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le nom du produit">
                                        <i className="ki-outline ki-information fs-7"></i>
                                      </span>
                                    </label>
                                    <input type="text" className="form-control form-control-solid" name="nom" value={updatedData.nom} onChange={handleUpdateChange} />
                                  </div>
                                </div>
                              </div>
                              <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                                <div className="col">
                                  <div className="fv-row mb-7">
                                    <label className="fs-6 fw-semibold form-label mt-3">
                                      <span className="required">Prix du produit</span>
                                      <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le prix du produit">
                                        <i className="ki-outline ki-information fs-7"></i>
                                      </span>
                                    </label>
                                    <input type="number" className="form-control form-control-solid" name="prix" value={updatedData.prix} onChange={handleUpdateChange} />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="fv-row mb-7">
                                    <label className="fs-6 fw-semibold form-label mt-3">
                                      <span className="required">Quantité ajoutée</span>
                                      <span className="ms-1" data-bs-toggle="tooltip" title="Entrez la quantité à ajouter">
                                        <i className="ki-outline ki-information fs-7"></i>
                                      </span>
                                    </label>
                                    <input type="number" className="form-control form-control-solid" name="quantiteStock" value={updatedData.quantiteStock} onChange={handleUpdateChange} />
                                  </div>
                                </div>
                              </div>
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Date de péremption</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez la date de péremption">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="date" className="form-control form-control-solid" name="datePeremption" value={formatDate2(updatedData.datePeremption)} onChange={handleUpdateChange} />
                              </div>
                              <div className="separator mb-6"></div>
                              <div className="d-flex justify-content-end">
                                <button type="reset" data-kt-contacts-type="cancel" className="btn btn-light me-3">Annuler</button>
                                <button className="btn btn-primary" onClick={(e) => handleUpdate(e, selectedProduct.id)}>
                                  <span className="indicator-label">Enregistrer les modifications</span>
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

              {/* End Edit Product Modal */}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products