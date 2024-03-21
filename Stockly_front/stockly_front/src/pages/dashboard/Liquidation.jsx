import React, { useState, useEffect } from 'react'
import { API_URL } from '../../components/constantes';
import { formatDate } from '../../helpers/DateFormat';

function Liquidation() {

    const [liquidations, setLiquidation] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/produits/liquidation`)
            .then(response => response.json())
            .then(data => {
                setLiquidation(data)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des statistiques des produits en liquidation: ', error)
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
                        <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Produits à liquider</h1>
                    </div>
                </div>
            </div>

            <div id="kt_app_content" className="app-content">
                <div className="card mb-5 mb-xl-8">
                    <div className="card-header border-0 pt-5">
                        <div className="card-toolbar align-items-center gap-2 gap-lg-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to add a user">
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
                                        <th className="w-25px">
                                            <div className="form-check form-check-sm form-check-custom form-check-solid">
                                                <input className="form-check-input" type="checkbox" value="1" data-kt-check="true" data-kt-check-target=".widget-9-check" />
                                            </div>
                                        </th>
                                        <th className="min-w-200px">Catégorie</th>
                                        <th className="min-w-300px">Produit</th>
                                        <th className="min-w-100px">Prix</th>
                                        <th className="min-w-100px">Quantité</th>
                                        <th className="min-w-100px">Péremption</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        liquidations.map((liquidation, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="form-check form-check-sm form-check-custom form-check-solid">
                                                        <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="d-flex justify-content-start flex-column">
                                                            <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">{liquidation.Categorie.libelle}</a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">{liquidation.nom}</a>
                                                </td>
                                                <td className="text-end">
                                                    <div className="d-flex flex-column w-100 me-2">
                                                        <div className="d-flex flex-stack mb-2">
                                                            <span className="text-gray-700 fw-bold text-hover-primary d-block fs-6">{liquidation.prix}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-end">
                                                    <div className="d-flex flex-column w-100 me-2">
                                                        <div className="d-flex flex-stack mb-2">
                                                            <span className="text-gray-700 fw-bold text-hover-primary d-block fs-6">{liquidation.quantiteStock}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-end">
                                                    <div className="d-flex flex-column w-100 me-2">
                                                        <div className="d-flex flex-stack mb-2">
                                                            <span className="text-danger fw-bold d-block fs-6">{formatDate(liquidation.datePeremption)}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Liquidation