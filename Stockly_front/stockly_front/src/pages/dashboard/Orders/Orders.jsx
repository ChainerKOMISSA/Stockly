import React, { useState, useEffect } from 'react'
import { API_URL } from '../../../components/constantes'
import { useNavigate, Link } from 'react-router-dom'
import { createSuccessAlert, failureAlert, updateSuccessAlert, deleteSuccessAlert } from '../../../components/alerts'
import Swal from 'sweetalert2'
import { getCurrentDate } from '../../../helpers/CalendarControl'
import { formatDate } from '../../../helpers/DateFormat'
import { useUser } from '../../UserContext'
import Select from 'react-select'


function Orders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [produits, setProduits] = useState([]);
  const [formData, setFormData] = useState({});
  const [listeProduits, setListeProduits] = useState([]);
  const [orderData, setOrderData] = useState({
    dateCommande: getCurrentDate(),
    codeCommande: "",
  });
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true)

  const { userData } = useUser();

  console.log(userData);

  let options = produits.map((produit) => ({
    value: produit.id,
    label: produit.nom
  }));


  useEffect(() => {
    fetch(`${API_URL}/commandes`)
      .then(response => response.json())
      .then(data => {
        setOrders(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des commandes: ', error)
      })
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/suppliers`)
      .then(response => response.json())
      .then(data => {
        setSuppliers(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des fournisseurs: ', error)
      })
  }, []);

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

  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelectChange = (option) => {
    setSelectedOption(option)
    handleChangeProduit(option)
  }

  const handleChangeProduit = (selectedOption) => {
    if (selectedOption) {
      let prod = selectedOption.value;
      let prd = produits.find(produit => produit.id == prod)
      if (prd) {
        setFormData(
          {
            ...formData,
            id: prd.id,
            nom: prd.nom,
          }
        )
      }
    }
  }

  const registerOrder = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  }

  const handleSupplierChange = (e) => {
    setOrderData({
      ...orderData,
      'idFournisseur': e.target.value,
      'codeCommande': getCommandeCode(e.target.value)
    })
    setFormData({
      ...formData,
      'codeCommande': getCommandeCode(e.target.value),
    });
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
      const response = await fetch(`${API_URL}/commandes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
        prixAchat: formData.prixAchat,
        quantite: formData.quantite,
        codeCommande: orderData.codeCommande,
      })


      let row = table.insertRow(
        table.childNodes.length - 1
      )

      // Ajoute un attribut data-id à la ligne avec la valeur de l'identifiant du produit
      row.setAttribute("data-id", formData.id);

      let cell1 = row.insertCell(0)
      cell1.innerHTML = listeProduits[listeProduits.length - 1].nom

      let cell2 = row.insertCell(1)
      cell2.innerHTML = listeProduits[listeProduits.length - 1].prixAchat

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
        prixAchat: 0,
        Montant_Commande: 0,
        nom: "",
      })
      let select = document.querySelector(".produit_select")
      select.selectedIndex = 0;
    } else {
      //afficher qu'on a pas selectionner de produit
    }
  }

  const handleQuantityChange = (e) => {
    setFormData({
      ...formData,
      quantite: e.target.value,
      Montant_Commande: formData.prixAchat * e.target.value
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response1 = await fetch(`${API_URL}/commandes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response1.ok) {
        const cmddata = await response1.json();
        const idCommande = cmddata.id;
        const produitCommandedata = {
          idCommande: idCommande,
          produits: listeProduits
        }
        const response2 = await fetch(`${API_URL}/produitcommande`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(produitCommandedata),
        });
        if (response2.ok) {
          createSuccessAlert();
          navigate(0);
        } else {
          const errorData = await response2.json();
          failureAlert(errorData);
        }
      } else {
        const errorData = await response1.json();
        failureAlert(errorData)
      }
    }
    catch (error) {
      failureAlert(error)
    }
  }


  const getCommandeCode = (nom) => {
    if (nom) {
      const date = getCurrentDate();
      // Génère le code en concaténant la date et le nom de l'employé
      const codeCommande = date + '_[Fournisseur' + nom + ']';
      return codeCommande;
    } else return ""
  }

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleOrderSelect = (orderId) => {
    setSelectedOrderId(orderId);
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
              <li className="breadcrumb-item text-gray-500 mx-n1">Commandes</li>
            </ul>
            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Liste des commandes</h1>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content">
        <div className="card mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            <div className="card-toolbar align-items-center gap-2 gap-lg-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to add a user">
              <a href="#" className="btn btn-sm btn-light btn-active-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_share_earn">
                <i className="ki-outline ki-plus fs-2"></i>
                Nouvelle commande
              </a>
              <a href="#" className="btn btn-sm btn-light-primary">
                <i className="ki-outline ki-printer fs-2"></i>
                Exporter
              </a>
            </div>
          </div>
          <div className="card-body py-3">
            <div className="table-responsive">
              <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                <thead>
                  <tr className="fw-bold text-muted">
                    <th className="min-w-150px">Date de la commande</th>
                    <th className="min-w-200px">Fournisseur</th>
                    <th className="min-w-200px">Etat de la commande</th>
                    <th className="min-w-200px">Produits ajoutés au stock?</th>
                    <th className="min-w-100px text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orders.map((order, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="d-flex justify-content-start flex-column">
                              <a className="text-gray-900 fw-bold text-hover-primary fs-6">{formatDate(order.dateCommande)}</a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <a className="text-gray-900 fw-bold text-hover-primary fs-6">{order.Fournisseur.nom}</a>
                        </td>
                        <td>
                          <a className="text-gray-900 fw-bold text-hover-primary fs-6">
                            <div className={`badge d-inline ${order.etat === 'NV' ? 'badge-light-danger' :
                              order.etat === 'V' ? 'badge-light-success' :
                                order.etat === 'L' ? 'badge-light-info' :
                                  order.etat === 'P' ? 'badge-light-warning' :
                                    '' // Si aucun des cas ne correspond, aucune classe n'est ajoutée
                              }`}>
                              {order.etat === 'NV' ? 'Non validée' :
                                order.etat === 'V' ? 'Validée' :
                                  order.etat === 'L' ? 'Livrée' :
                                    order.etat === 'P' ? 'Programmée' :
                                      order.etat // Si aucun des cas ne correspond, affiche simplement la valeur
                              }
                            </div>
                          </a>
                        </td>
                        <td>
                          <a className="text-gray-900 fw-bold text-hover-primary fs-6">{order.addToStock ? "Oui" : "Non"}</a>
                        </td>
                        <td>
                          <div className="d-flex justify-content-end flex-shrink-0">
                            <Link to={`/orders/${order.id}`}>
                              <a className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" onClick={() => handleOrderSelect(order.id)}>
                                <i className="ki-outline ki-file fs-2"></i>
                              </a>
                            </Link>
                            <a href="#" className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm" onClick={(e) => confirmDelete(order.id)}>
                              <i className="ki-outline ki-trash fs-2"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {/* Create Category Modal */}
              <div className="modal fade" id="kt_modal_share_earn" tabIndex="-1" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered mw-1000px">
                  <div className="modal-content">
                    <div className="modal-header pb-0 border-0 justify-content-end">
                      <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                        <i className="ki-outline ki-cross fs-1"></i>
                      </div>
                    </div>
                    <div className="modal-body scroll-y pt-0 pb-15">
                      <div className="mw-lg-900px mx-auto">
                        <div className="mb-13 text-center">
                          <h1 className="mb-3">Enregistrer une commande</h1>
                          <div className="text-muted fw-semibold fs-5">Entrez les informations pour enregistrer la commande.
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
                                <input type="date" min={getCurrentDate()} className="form-control form-control-solid" name="dateCommande" id='dateCommande' value={orderData.dateCommande} onChange={registerOrder} required />
                              </div>
                            </div>
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Fournisseur</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Choisissez le fournisseur">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <div className="w-100">
                                  <select id="kt_ecommerce_select2_country" className="form-select form-select-solid" data-kt-ecommerce-settings-type="select2_flags" data-placeholder="Sélectionnez..." onChange={handleSupplierChange} name="idFournisseur" required>
                                    <option value="">Sélectionnez...</option>
                                    {
                                      suppliers.map((supplier, index) => (
                                        <option key={index} value={supplier.id}>{supplier.nom}</option>
                                      ))
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="fv-row mb-7">
                                <input type="hidden" className="form-control form-control-solid" name="codeCommande" value={orderData.codeCommande} readOnly />
                              </div>
                            </div>
                          </div>

                          <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Produit à commander</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Choisissez un produit">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <div className="w-100">
                                  {/* <select id="kt_ecommerce_select2_country" className="form-select form-select-solid produit_select" data-kt-ecommerce-settings-type="select2_flags" data-placeholder="Sélectionnez..." onChange={handleChangeProduit} name="nom">
                                    <option value="">Sélectionnez...</option>
                                    {
                                      produits.map((produit, index) => (
                                        <option key={index} value={produit.id}>{produit.nom}</option>
                                      ))
                                    }
                                  </select> */}
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
                                  <span className="required">Prix du produit</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le prix du produit">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="number" className="form-control form-control-solid" id='prixAchat' name="prixAchat" value={formData.prixAchat} onChange={handleChange} />
                              </div>
                            </div>
                          </div>
                          <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                            <div className="col">
                              <div className="fv-row mb-7">
                                <label className="fs-6 fw-semibold form-label mt-3">
                                  <span className="required">Quantité commandée</span>
                                  <span className="ms-1" data-bs-toggle="tooltip" title="Entrez la quantité vendue">
                                    <i className="ki-outline ki-information fs-7"></i>
                                  </span>
                                </label>
                                <input type="number" min={0} className="form-control form-control-solid" id="quantite" name="quantite" value={formData.quantite} onChange={e => handleQuantityChange(e)} />
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
                                <input type="text" className="form-control form-control-solid" name="Montant_Commande" value={formData.Montant_Commande} readOnly />
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-end">
                            <button className="btn btn-primary" id="BtnAjouter" onClick={addProductToList}>
                              <span className="indicator-label">Ajouter</span>
                            </button>
                          </div>
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
                          <div className="d-flex justify-content-end" id="bill_button">
                            <span className="btn btn-light me-3 fw-semibold fs-5" hidden={true} id="bill_button"><i className="ki-outline ki-basket fs-3"></i> Montant total de la commande : { } FCFA</span>
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Orders