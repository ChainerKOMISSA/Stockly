import React, { useState, useEffect } from "react";
import { API_URL } from "../../../components/constantes";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../helpers/DateFormat";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReceiptRenderer from "./ReceiptRenderer";
import { formatNumber } from "../../../helpers/functions";

const SalesDetails = () => {
    const [salesdetails, setSalesDetails] = useState(null);
    const [listeproduits, setListeProduits] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        fetch(`${API_URL}/ventes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setSalesDetails(data);
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération des détails des ventes: ",
                    error
                );
            });

        fetch(`${API_URL}/produitvente/${id}`)
            .then((response) => response.json())
            .then((data2) => {
                setListeProduits(data2);
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération des détails des produits vendus: ",
                    error
                );
            });
    }, [id]);

    const [reduction, setReduction] = useState(0);

    const handleDiscountChange = (e) => {
        const value = parseFloat(e.target.value);
        setReduction({
            ...reduction,
            [e.target.name]: value || 0
        });
    }

    function getMontantTotal(listeproduits) {
        if (listeproduits && listeproduits.length > 0) {
            const total = listeproduits.reduce((acc, produit) => {
                return acc + produit.prix * produit.quantite;
            }, 0);
            return total - reduction;
        } else {
            return 0;
        }
    }


    /*function applyDiscount() { 
        const total = getMontantTotal(listeproduits);
        const reduction = parseFloat(document.querySelector('input[name="reduction"]').value) || 0;
        const totalApresReduction = total - reduction;
        document.querySelector('td[name="montanttotal"]').value = totalApresReduction.toFixed(2);
    }*/

    function printReceipt(listeproduits) {
        if (listeproduits && listeproduits.length > 0) {
            return (
                <PDFDownloadLink
                    document={<ReceiptRenderer listeproduits={listeproduits} />}
                    fileName="recu.pdf"
                    style={{ textDecoration: "none" }}
                >
                    {({ loading }) => (
                        <button
                            type="button"
                            className="btn btn-sm btn-flex btn-light-primary"
                        >
                            <i className="ki-outline ki-printer fs-3"></i>
                            {loading ? "Génération du PDF..." : "Imprimer un reçu"}
                        </button>
                    )}
                </PDFDownloadLink>
            );
        } else {
            return (
                <button
                    type="button"
                    className="btn btn-sm btn-flex btn-light-primary"
                    disabled
                >
                    <i className="ki-outline ki-printer fs-3"></i>Imprimer un reçu
                </button>
            );
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
                            <li className="breadcrumb-item text-gray-700 fw-bold lh-1 mx-n1">
                                Ventes
                            </li>
                            <li className="breadcrumb-item">
                                <i className="ki-outline ki-right fs-7 text-gray-700"></i>
                            </li>
                            <li className="breadcrumb-item text-gray-500 mx-n1">
                                Détails de ventes
                            </li>
                        </ul>
                        <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">
                            Détails de ventes
                        </h1>
                    </div>
                </div>
            </div>

            <div id="kt_app_content" className="app-content">
                <div className="d-flex flex-column flex-xl-row">
                    <div className="flex-column flex-lg-row-auto w-80 w-xl-250px mb-10">
                        <div className="card mb-5 mb-xl-8">
                            <div className="card-body pt-15">
                                <div className="d-flex flex-stack fs-4 py-3">
                                    <div
                                        className="fw-bold rotate collapsible"
                                        data-bs-toggle="collapse"
                                        href="#kt_customer_view_details"
                                        role="button"
                                        aria-expanded="false"
                                        aria-controls="kt_customer_view_details"
                                    >
                                        Détails
                                        <span className="ms-2 rotate-180">
                                            <i className="ki-outline ki-down fs-3"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="separator separator-dashed my-3"></div>
                                <div id="kt_customer_view_details" className="collapse show">
                                    {salesdetails ? (
                                        <div className="py-5 fs-6">
                                            <div className="fw-bold mt-5">Date</div>
                                            <div className="text-gray-600">
                                                {formatDate(salesdetails.dateVente)}
                                            </div>
                                            <div className="fw-bold mt-5">Vendeur</div>
                                            <div className="text-gray-600">
                                                {salesdetails.Employe.nom} {salesdetails.Employe.prenom}
                                            </div>
                                        </div>
                                    ) : (
                                        <p>Chargement des détails de la vente...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-lg-row-fluid ms-lg-15">
                        <div className="tab-content" id="myTabContent">
                            <div
                                className="tab-pane fade show active"
                                id="kt_customer_view_overview_tab"
                                role="tabpanel"
                            >
                                <div className="card pt-4 mb-6 mb-xl-9">
                                    <div className="card-header border-0">
                                        <div className="card-title">
                                            <h3>Liste des produits</h3>
                                        </div>
                                        <div className="card-toolbar align-items-center gap-2 gap-lg-3">{printReceipt(listeproduits)}</div>
                                    </div>
                                    <div className="card-body pt-0 pb-5">
                                        <table
                                            className="table align-middle table-row-dashed gy-5"
                                            id="kt_table_customers_payment"
                                        >
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
                                                            <td>{produit.nom}</td>
                                                            <td>{formatNumber(produit.prix)}</td>
                                                            <td>{produit.quantite}</td>
                                                            <td id="montant">
                                                                {formatNumber(produit.prix * produit.quantite)}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4">Aucun produit dans cette vente.</td>
                                                    </tr>
                                                )}
                                                <tr>
                                                    <td
                                                        className="fs-4 fw-bold text-600 text-end"
                                                        name="montanttotal"
                                                        colSpan={5}
                                                    >
                                                        Total : {formatNumber(getMontantTotal(listeproduits))} FCFA
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
        </>
    );
};

export default SalesDetails;
