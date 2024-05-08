import React, { useState, useEffect } from 'react'
import { API_URL } from '../../../components/constantes'
import { useNavigate, useParams } from 'react-router-dom'
import { formatDate } from '../../../helpers/DateFormat'
import { getCurrentDate } from '../../../helpers/CalendarControl'
import { createSuccessAlert, failureAlert } from '../../../components/alerts'
import Swal from 'sweetalert2'
import { useUser } from '../../UserContext'

const OrdersDetails = () => {
    const navigate = useNavigate()
    const [orderdetails, setOrdersDetails] = useState(null)
    const [listeproduits, setListeProduits] = useState([])
    const { id } = useParams();
    const [etat, setEtat] = useState({});
    const { userData } = useUser();

    console.log(userData);

    useEffect(() => {
        fetch(`${API_URL}/commandes/${id}`)
            .then(response => response.json())
            .then(data => {
                setOrdersDetails(data);
                // console.log(data); // Affiche les données récupérées de la commande dans la console
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des détails des commandes: ', error);
            });

        fetch(`${API_URL}/produitcommande/${id}`)
            .then(response => response.json())
            .then(data2 => {
                setListeProduits(data2);
                // console.log(data2); // Affiche les données récupérées des produits de la commande dans la console
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des détails des produits commandés: ', error);
            });
    }, [id]);


    function getMontantTotal(listeproduits) {
        if (listeproduits && listeproduits.length > 0) {
            const total = listeproduits.reduce((acc, produit) => {
                return acc + (produit.prixAchat * produit.quantite);
            }, 0);
            return total;
        } else {
            return 0;
        }
    }

    const handleNewState = (e) => {
        const { name, value } = e.target;
        setEtat({
            ...etat,
            [name]: value,
        });
    }

    const handleSaveEtat = async (id) => {
        // e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/commandes/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(etat),
            });
            if (response.ok) {
                createSuccessAlert();
            } else {
                const errorData = await response.json();
                failureAlert(errorData);
            }
        } catch (error) {
            failureAlert(error)
        }
    }


    function confirmAddToStock(id, etat, produits) {
        Swal.fire({
            title: "Etes-vous sûr d'ajouter ces produits au stock?",
            text: "Cette action est irréversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Annuler",
            confirmButtonText: "Oui, ajouter"
        }).then((result) => {
            if (result.isConfirmed) {
                addProductsToStock(id, etat, produits);
            }
        });
    }

    const addProductsToStock = async (id, etat, produits) => {
        console.log("Produits à ajouter au stock", produits);
        if (etat === "L") {
            try {
                const response = await fetch(`${API_URL}/produits`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ produits }),
                });
                if (response.ok) {
                    const response2 = await fetch(`${API_URL}/commandes/stock/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ addToStock: true }),
                    });

                    if (response2.ok) {
                        const data = await response2.json();
                        createSuccessAlert()
                    } else {
                        const errorData = await response.json();
                        failureAlert(errorData)
                    }
                } else {
                    const errorData = await response.json();
                    failureAlert(errorData)
                }
            } catch (error) {
                failureAlert(error)
            }
        } else {
            failureAlert("Cette commande n'a pas encore été livrée!");
        }
    }

    function confirmDelivery(id, etat) {
        Swal.fire({
            title: "Etes-vous sûr d'enregistrer la livraison de cette commande",
            text: "Cette action est irréversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Annuler",
            confirmButtonText: "Oui, enregistrer"
        }).then((result) => {
            if (result.isConfirmed) {
                handleSaveDelivery(id, etat);
            }
        });
    }

    const handleSaveDelivery = async (id, etat) => {
        // e.preventDefault();
        if (etat === "P") {
            try {
                const response = await fetch(`${API_URL}/livraisons`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ idCommande: id, dateLivraison: getCurrentDate() }),
                });

                if (response.ok) {
                    const etat = "L";
                    const response2 = await fetch(`${API_URL}/commandes/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ etat: etat }),
                    });
                    if (response2.ok) {
                        createSuccessAlert();
                    } else {
                        const errorData = await response.json();
                        failureAlert(errorData);
                    }
                } else {
                    const errorData = await response.json();
                    failureAlert(errorData)
                }
            } catch (error) {
                failureAlert(error);
            }
        } else if (etat === "L") {
            failureAlert("Cette commande a déjà été livrée!");

        } else {
            failureAlert("La livraison de cette commande n'est pas programmée!");
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
                            <li className="breadcrumb-item text-gray-700 fw-bold lh-1 mx-n1">Commandes</li>
                            <li className="breadcrumb-item">
                                <i className="ki-outline ki-right fs-7 text-gray-700"></i>
                            </li>
                            <li className="breadcrumb-item text-gray-500 mx-n1">Détails de commandes</li>
                        </ul>
                        <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Détails de commandes</h1>
                    </div>
                </div>
            </div>

            <div id="kt_app_content" className="app-content">
                <div className="d-flex flex-column flex-xl-row">
                    <div className="flex-column flex-lg-row-auto w-80 w-xl-250px mb-10">
                        <div className="card mb-5 mb-xl-8">
                            <div className="card-body pt-15">
                                <div className="d-flex flex-stack fs-4 py-3">
                                    <div className="fw-bold rotate collapsible" data-bs-toggle="collapse" href="#kt_customer_view_details" role="button" aria-expanded="false" aria-controls="kt_customer_view_details">Détails
                                        <span className="ms-2 rotate-180">
                                            <i className="ki-outline ki-down fs-3"></i>
                                        </span></div>
                                    <span data-bs-toggle="tooltip" data-bs-trigger="hover" title="Edit customer details">
                                        <a href="#" className="btn btn-sm btn-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_update_customer"><i className="ki-outline ki-pencil fs-4"></i></a>
                                    </span>
                                </div>
                                <div className="separator separator-dashed my-3"></div>
                                <div id="kt_customer_view_details" className="collapse show">
                                    {orderdetails ? (
                                        <>
                                            <div className="py-5 fs-6">
                                                <div className={`badge d-inline ${orderdetails.etat === 'NV' ? 'badge-light-danger' :
                                                    orderdetails.etat === 'V' ? 'badge-light-success' :
                                                        orderdetails.etat === 'L' ? 'badge-light-info' :
                                                            orderdetails.etat === 'P' ? 'badge-light-warning' :
                                                                ''}`}>
                                                    {orderdetails.etat === 'NV' ? 'Non validée' :
                                                        orderdetails.etat === 'V' ? 'Validée' :
                                                            orderdetails.etat === 'L' ? 'Livrée' :
                                                                orderdetails.etat === 'P' ? 'Programmée' :
                                                                    orderdetails.etat}
                                                </div>
                                                <div className="fw-bold mt-5">Date</div>
                                                <div className="text-gray-600">{formatDate(orderdetails.dateCommande)}</div>
                                                <div className="fw-bold mt-5">Fournisseur</div>
                                                <div className="text-gray-600">{orderdetails.Fournisseur.nom}</div>
                                                <div className="fw-bold mt-5">Commande ajoutée au stock</div>
                                                <div className="text-gray-600">{orderdetails.addToStock ? "Oui" : "Non"}</div>
                                            </div>


                                            <div className="modal fade" id="kt_modal_update_customer" tabIndex="-1" aria-hidden="true" >
                                                <div className="modal-dialog modal-dialog-centered mw-600px">
                                                    <div className="modal-content">
                                                        <div className="modal-header pb-0 border-0 justify-content-end">
                                                            <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                                                                <i className="ki-outline ki-cross fs-1"></i>
                                                            </div>
                                                        </div>
                                                        <div className="modal-body scroll-y pt-0 pb-15">
                                                            <div className="mw-lg-400px mx-auto">
                                                                <div className="mb-13 text-center">
                                                                    <h1 className="mb-3">Modifier l'état de la commande</h1>
                                                                    <div className="text-muted fw-semibold fs-5">Choisissez le nouvel état de la commande.
                                                                    </div>
                                                                </div>
                                                                <form id="kt_ecommerce_settings_general_form" className="form">
                                                                    <div className="fv-row mb-7">
                                                                        <label className="fs-6 fw-semibold form-label mt-3">
                                                                            <span className="required">Etat de la commande</span>
                                                                            <span className="ms-1" data-bs-toggle="tooltip" title="Choisissez le fournisseur">
                                                                                <i className="ki-outline ki-information fs-7"></i>
                                                                            </span>
                                                                        </label>
                                                                        <div className="w-100">
                                                                            <select
                                                                                id="kt_ecommerce_select2_country"
                                                                                className="form-select form-select-solid"
                                                                                data-kt-ecommerce-settings-type="select2_flags"
                                                                                data-placeholder="Sélectionnez..."
                                                                                name="etat"
                                                                                onChange={handleNewState}
                                                                            >
                                                                                <option value="">Sélectionnez...</option>
                                                                                <option value="NV" selected={orderdetails.etat === 'NV'}>Non validée</option>
                                                                                <option value="V" selected={orderdetails.etat === 'V'}>Validée</option>
                                                                                <option value="P" selected={orderdetails.etat === 'P'}>Programmée</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="separator mb-6"></div>
                                                                    <div className="d-flex justify-content-end">
                                                                        <button type="reset" data-kt-contacts-type="cancel" className="btn btn-light me-3">Annuler</button>
                                                                        <button className="btn btn-primary" onClick={() => handleSaveEtat(id)}>
                                                                            <span className="indicator-label">Enregistrer le nouvel état</span>
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <p>Chargement des détails de la commande...</p>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-lg-row-fluid ms-lg-15">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="kt_customer_view_overview_tab" role="tabpanel">
                                <div className="card pt-4 mb-6 mb-xl-9">
                                    <div className="card-header border-0">
                                        <div className="card-title">
                                            <h3>Liste des produits</h3>
                                        </div>
                                        <div className="card-toolbar align-items-center gap-2 gap-lg-3">
                                            {orderdetails ? (
                                                <>
                                                    <button type="button" className="btn btn-sm btn-flex btn-light-info" onClick={() => confirmDelivery(orderdetails.id, orderdetails.etat)}>
                                                        <i className="ki-outline ki-delivery fs-3"></i>Enregistrer la livraison
                                                    </button>
                                                    {listeproduits ? (
                                                        <>
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-flex btn-light-primary"
                                                                onClick={() => confirmAddToStock(orderdetails.id, orderdetails.etat, listeproduits)}
                                                                disabled={orderdetails.addToStock}
                                                            >
                                                                <i className="ki-outline ki-plus fs-3"></i>Ajouter au stock
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <p>Chargement des détails de la commande...</p>
                                                    )}
                                                </>
                                            ) : (
                                                <p>Chargement des détails de la commande...</p>
                                            )}
                                        </div>

                                    </div>
                                    <div className="card-body pt-0 pb-5">
                                        <table className="table align-middle table-row-dashed gy-5" id="kt_table_customers_payment">
                                            <thead className="border-bottom border-gray-200 fs-7 fw-bold">
                                                <tr className="text-start text-muted text-uppercase gs-0">
                                                    <th className="min-w-100px">#</th>
                                                    <th>Produit</th>
                                                    <th className="min-w-100px">Prix</th>
                                                    <th className="min-w-100px">Quantité</th>
                                                    <th className="min-w-100px">Montant</th>
                                                </tr>
                                            </thead>
                                            <tbody className="fs-6 fw-semibold text-gray-600">
                                                {listeproduits ? (
                                                    listeproduits.map((produit, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{produit.Produit.nom}</td>
                                                            <td>{produit.prixAchat}</td>
                                                            <td>{produit.quantite}</td>
                                                            <td id='montant'>{produit.prixAchat * produit.quantite}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4">Aucun produit dans cette vente.</td>
                                                    </tr>
                                                )}
                                                <tr>
                                                    <td className="fs-4 fw-bold text-600 text-end" colSpan={5}>Total : {getMontantTotal(listeproduits)} FCFA</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default OrdersDetails