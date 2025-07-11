import React, { useState, useEffect, useRef } from 'react'
import { API_URL } from '../../../components/constantes'
import { useNavigate, Link } from 'react-router-dom'
import { createSuccessAlert, failureAlert, updateSuccessAlert, deleteSuccessAlert } from '../../../components/alerts'
import { getCurrentDate } from '../../../helpers/CalendarControl'
import { formatDate } from '../../../helpers/DateFormat'
import { useUser } from '../../UserContext'
import Select from 'react-select'


function Sales() {
  const navigate = useNavigate()
  const [sales, setSales] = useState([])
  const [vendeurs, setVendeurs] = useState([])
  const [produits, setProduits] = useState([])
  const [formData, setFormData] = useState({ quantite: 0, Montant_Vente: 0, prix: 0, nom: "" });
  const [listeProduits, setListeProduits] = useState([]);
  const [saleData, setSaleData] = useState({
    dateVente: getCurrentDate(),
    codeVente: "",
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSales, setFilteredSales] = useState(sales);

  const { userData } = useUser();

  console.log(userData);

  let options = produits.map((produit) => ({
    value: produit.id,
    label: produit.nom,
    stock: produit.quantiteStock
  }));

  const [isClearable, setIsClearable] = useState(false);
  const [isSearchable, setIsSearchable] = useState(true)
  const [stock, setStock] = useState(options[0]?.stock || 0);



  useEffect(() => {
    fetch(`${API_URL}/ventes`)
      .then(response => response.json())
      .then(data => {
        setSales(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des ventes: ', error)
      })
  }, []);

  useEffect(() => {
    setFilteredSales(
      sales.filter(sale =>
        sale.Employe.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.dateVente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.Employe.prenom.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, sales])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetch(`${API_URL}/produits`)
      .then(response => response.json())
      .then(data => {
        setProduits(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des produits: ', error)
      })
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/employes/vendeurs`)
      .then(response => response.json())
      .then(data => {
        setVendeurs(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des employés: ', error)
      })
  }, []);

  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelectChange = (option) => {
    setSelectedOption(option)
    handleChangeProduit(option)
    setStock(option.stock)
  }

  const handleChangeProduit = (selectedOption) => {
    if (selectedOption) {
      let prod = selectedOption.value;
      let prd = produits.find((produit) => produit.id == prod);
      if (prd) {
        setFormData({
          ...formData,
          id: prd.id,
          nom: prd.nom,
          prix: prd.prix + ((prd.prix * prd.tva)/100),
        });
      }
    }
  };

  const registerSale = (e) => {
    const { name, value } = e.target;
    setSaleData({
      ...saleData,
      [name]: value,
    });
  }

  const handleEmployeeChange = (e) => {
    setSaleData({
      ...saleData,
      'idEmploye': e.target.value,
      'codeVente': getVenteCode(e.target.value)
    })
    setFormData({
      ...formData,
      'codeVente': getVenteCode(e.target.value),
    });
  }


  const handleDelete = (id) => {
    try {
      const response = fetch(`${API_URL}/ventes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = response.json();
        deleteSuccessAlert()
        navigate(0)
      } else {
        const errorData = response.json();
        failureAlert(errorData)
      }
    }
    catch (error) {
      failureAlert(error)
    }
  }


  const addProductToList = (e) => {
    if (formData.nom) {
      e.preventDefault();
      document.getElementById("product_list_table").hidden = false;
      document.getElementById("bill_button").hidden = false;
      document.getElementById("CancelBtn").hidden = false;
      document.getElementById("SaveBtn").hidden = false;

      let table = document.getElementById("product_list_table")
      listeProduits.push({
        idProduit: formData.id,
        nom: formData.nom,
        prix: formData.prix,
        quantite: formData.quantite,
        codeVente: saleData.codeVente,
      })


      let row = table.insertRow(
        table.childNodes.length - 1
      )

      // Ajoute un attribut data-id à la ligne avec la valeur de l'identifiant du produit
      row.setAttribute("data-id", formData.id);

      let cell1 = row.insertCell(0)
      cell1.innerHTML = listeProduits[listeProduits.length - 1].nom

      let cell2 = row.insertCell(1)
      cell2.innerHTML = listeProduits[listeProduits.length - 1].prix

      let cell3 = row.insertCell(2)
      cell3.innerHTML = listeProduits[listeProduits.length - 1].quantite

      let cell2Value = parseFloat(cell2.innerHTML);
      let cell3Value = parseFloat(cell3.innerHTML);

      let somme = cell2Value * cell3Value
      let cell4 = row.insertCell(3)
      cell4.innerHTML = somme

      let cell5 = row.insertCell(4)

      let button = document.createElement("button");
      button.classList.add("btn", "btn-light-danger");
      let icon = document.createElement("i");
      icon.classList.add("ki-outline", "ki-trash");
      button.appendChild(icon);

      button.addEventListener("click", function () {
        let id = listeProduits[listeProduits.length - 1].idProduit;
        removeFromList(id, e);
      });

      cell5.appendChild(button);

      let total = 0

      for (let i = 1; i < table.rows.length; i++) {
        let cellValue = parseFloat(table.rows[i].cells[3].innerHTML);
        total += cellValue;
      }

      let totalElement = document.getElementById("bill_button");
      if (totalElement) {
        totalElement.textContent = `Montant total à payer : ${total} FCFA`;
      } else {
        totalElement.textContent = `Montant total à payer : 0 FCFA`;
      }
      setFormData({
        ...formData,
        quantite: 0,
        prix: 0,
        Montant_Vente: 0,
        nom: "",
      })
      let select = document.querySelector(".produit_select")
      select.selectedIndex = 0;
    } else {
      //afficher qu'on a pas sélectionné de produit
    }

  }

  const handleQuantityChange = (e) => {
    setFormData({
      ...formData,
      quantite: e.target.value,
      Montant_Vente: formData.prix * e.target.value
    })
  }

  const removeFromList = (id, e) => {
    e.preventDefault();
    // Recherche la ligne correspondante dans le tableau HTML en fonction de l'identifiant unique
    let rowToRemove = document.querySelector(`#product_list_table tr[data-id="${id}"]`);

    // Vérifie si la ligne existe
    if (rowToRemove) {
      // Supprime la ligne du tableau HTML
      rowToRemove.remove();

      // Recherche l'indice du produit dans listeProduits en fonction de son idProduit
      let index = listeProduits.findIndex(produit => produit.idProduit === id);

      // Vérifie si le produit existe dans la liste
      if (index !== -1) {
        // Retire le produit de listeProduits
        listeProduits.splice(index, 1);
      }


      // Recalcul de la somme totale
      let total = 0;
      let table = document.getElementById("product_list_table");
      for (let i = 1; i < table.rows.length; i++) {
        let cellValue = parseFloat(table.rows[i].cells[3].innerHTML);
        total += cellValue;
      }

      // Met à jour le texte du bouton avec la nouvelle somme totale
      let totalElement = document.getElementById("bill_button");
      if (totalElement) {
        totalElement.textContent = `Montant total à payer : ${total} FCFA`;
      } else {
        totalElement.textContent = `Montant total à payer : 0 FCFA`;
      }

    }
  }

  const getVenteCode = (nom) => {
    if (nom) {
      const date = getCurrentDate();
      // Génère le code en concaténant la date et le nom de l'employé
      const codeVente = date + '_[Employe' + nom + ']';
      return codeVente;
    } else return ""
  }

  // Fonction pour décrémenter la quantité du produit dans la base de données
  const decrementProductQuantity = async (productId, quantitySold) => {
    try {
      const response = await fetch(`${API_URL}/produits/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantitySold }), // Envoyer la quantité vendue
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message); // Lever une erreur en cas de problème avec la requête
      }
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de la quantité du produit: ' + error.message);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First, make a POST request to /ventes
      const response1 = await fetch(`${API_URL}/ventes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleData),
      });

      if (response1.ok) {
        const venteData = await response1.json();
        const idVente = venteData.id;
        const produitVenteData = {
          idVente: idVente,
          produits: listeProduits
        };

        const response2 = await fetch(`${API_URL}/produitvente`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(produitVenteData),
        });

        if (response2.ok) {
          for (const produit of produitVenteData.produits) {
            await decrementProductQuantity(produit.idProduit, produit.quantite);
          }
          createSuccessAlert();
          navigate(0);
        } else {
          const errorData = await response2.json();
          failureAlert(errorData);
        }
      } else {
        const errorData = await response1.json();
        failureAlert(errorData);
      }
    } catch (error) {
      failureAlert(error);
    }
  };

  const [selectedSaleId, setSelectedSaleId] = useState(null);

  const handleSaleSelect = (saleId) => {
    setSelectedSaleId(saleId);
  };


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
              <li className="breadcrumb-item text-gray-500 mx-n1">Ventes</li>
            </ul>
            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Liste des ventes</h1>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content">
        <div className="card mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            <div className="card-toolbar align-items-center gap-2 gap-lg-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Nouvelle vente">
              <a href="#" className="btn btn-sm btn-light btn-active-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_share_earn">
                <i className="ki-outline ki-plus fs-2"></i>
                Nouvelle vente
              </a>
              <a href="#" className="btn btn-sm btn-light-primary">
                <i className="ki-outline ki-printer fs-2"></i>
                Exporter
              </a>
              <div class="d-flex align-items-center">
                <div class="position-relative w-md-400px me-md-2">
                  <i class="ki-outline ki-magnifier fs-3 text-gray-500 position-absolute top-50 translate-middle ms-6"></i>
                  <input type="text" class="form-control form-control-solid ps-10" name="search" placeholder="Rechercher ..." value={searchTerm} onChange={handleSearchChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="card-body py-3">
            <div className="table-responsive">
              <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                <thead>
                  <tr className="fw-bold text-muted">
                    <th className="w-25px">#</th>
                    <th className="min-w-150px">Date</th>
                    <th className="min-w-200px">Employe</th>
                    <th className="min-w-100px text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filteredSales.map((sale, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="d-flex justify-content-start flex-column">
                              <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">{formatDate(sale.dateVente)}</a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <a className="text-gray-900 fw-bold text-hover-primary fs-6">{sale.Employe.nom} {sale.Employe.prenom}</a>
                        </td>
                        <td>
                          <div className="d-flex justify-content-end flex-shrink-0">
                            <Link to={`/sales/${sale.id}`}>
                              <a className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" onClick={() => handleSaleSelect(sale.id)}>
                                <i className="ki-outline ki-file fs-2"></i>
                              </a>
                            </Link>
                            <a className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm" onClick={() => handleDelete(sale.id)}>
                              <i className="ki-outline ki-trash fs-2"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {/* Create Sale Modal */}
              <div className="modal fade" id="kt_modal_share_earn" tabIndex="-1" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable mw-1000px">
                  <div className="modal-content">
                    <div className="modal-header pb-0 border-0 justify-content-end">
                      <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                        <i className="ki-outline ki-cross fs-1"></i>
                      </div>
                    </div>
                    <div className="modal-body scroll-y pt-0 pb-15">
                      <div className="mw-lg-900px mx-auto">
                        <div className="mb-13 text-center">
                          <h1 className="mb-3">Nouvelle vente</h1>
                          <div className="text-muted fw-semibold fs-5">Entrez les informations pour enregistrer la vente.
                          </div>
                        </div>
                        <form id="kt_ecommerce_settings_general_form" className="form">
                          <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Date</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez la date">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="date" min={getCurrentDate()} className="form-control form-control-solid" name="dateVente" value={saleData.dateVente} onChange={registerSale} required />
                              </div>
                            </div>
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Vendeur</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Choisissez un produit">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <div className="w-100">
                                  <select id="kt_ecommerce_select2_country" className="form-select form-select-solid" data-kt-ecommerce-settings-type="select2_flags" data-control="select2" data-placeholder="Sélectionnez..." onChange={handleEmployeeChange} name="idEmploye" required>
                                    <option value="">Sélectionnez...</option>
                                    {
                                      vendeurs.map((vendeur, index) => (
                                        <option key={index} value={vendeur.id}>{vendeur.nom} {vendeur.prenom}</option>
                                      ))
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="fv-row mb-7">
                                <input type="hidden" className="form-control form-control-solid" name="codeVente" value={saleData.codeVente} readOnly />
                              </div>
                            </div>
                          </div>
                          <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Produit à vendre</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Choisissez un produit">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <div className="w-100">
                                  <Select
                                    id="select_produit"
                                    className="produit_select"
                                    classNamePrefix="select"
                                    placeholder="Sélectionnez un produit ..."
                                    defaultValue={options[0]}
                                    isClearable={isClearable}
                                    isSearchable={isSearchable}
                                    options={options}
                                    value={selectedOption}
                                    onChange={(option) => handleSelectChange(option)}
                                    name="nom"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Prix de vente</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le prix du produit">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="number" className="form-control form-control-solid" id='prix' name="prix" value={formData.prix} readOnly />
                              </div>
                            </div>
                          </div>
                          <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Quantité à vendre</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez la quantité vendue">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="number" min={0} max={stock} className="form-control form-control-solid" id="quantite" name="quantite" value={formData.quantite} onChange={e => handleQuantityChange(e)} required />
                              </div>
                            </div>
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Montant total</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Le montant s'affiche automatiquement">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="text" className="form-control form-control-solid" name="Montant_Vente" value={formData.Montant_Vente} readOnly />
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-end">
                            <button className="btn btn-primary" id="BtnAjouter" onClick={addProductToList}>
                              <span className="indicator-label">Ajouter</span>
                            </button>
                          </div><br />
                          <table className="table table-row-dashed table-bordered table-row-gray-300 align-middle gs-0 gy-4" id="product_list_table" hidden={true}>
                            <thead>
                              <tr className="fw-bold text-muted">
                                <th className="min-w-200px" id="nomProduit">Produit</th>
                                <th className="min-w-200px" id="prixProduit">Prix</th>
                                <th className="min-w-200px" id="qtteProduit">Quantité</th>
                                <th className="min-w-200px" id="montantProduit">Montant</th>
                                <th className="min-w-200px" id="montantProduit">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                            </tbody>
                          </table>
                          <div className="d-flex justify-content-end">
                            <span className="btn btn-light me-3 fw-semibold fs-5" hidden={true} id="bill_button"><i className="ki-outline ki-basket fs-3"></i> </span>
                          </div><br />
                          <div className="separator mb-6"></div>
                          <div className="d-flex justify-content-end">
                            <button type="reset" data-kt-contacts-type="cancel" className="btn btn-light me-3" hidden={true} id="CancelBtn">Annuler</button>
                            <button className="btn btn-primary" hidden={true} id="SaveBtn" onClick={handleSubmit}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



export default Sales