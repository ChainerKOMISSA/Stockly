import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <div id="kt_app_sidebar" class="app-sidebar flex-column flex-shrink-0" data-kt-drawer="true" data-kt-drawer-name="app-sidebar" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="auto" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle">
                <div class="card py-5 bg-gray-200" data-kt-sticky="true" data-kt-sticky-name="app-sidebar-menu-sticky" data-kt-sticky-offset="{default: false, xl: '500px'}" data-kt-sticky-width="250px" data-kt-sticky-left="auto" data-kt-sticky-top="100px" data-kt-sticky-animation="false" data-kt-sticky-zindex="95">
                    <div class="hover-scroll-y mx-2 px-1 px-lg-2" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_app_header, #kt_app_footer" data-kt-scroll-wrappers="#kt_app_toolbar" data-kt-scroll-offset="5px">
                        <div id="kt_app_sidebar_menu" data-kt-menu="true" class="menu menu-sub-indention menu-rounded menu-column menu-active-bg menu-title-gray-600 menu-icon-gray-500 menu-state-primary menu-arrow-gray-500 fw-semibold fs-6">
                            <div class="menu-item">
                                <div class="menu-content">
                                    <span class="menu-section fs-5 fw-bolder ps-1 py-1">Accueil</span>
                                </div>
                            </div>
                            <div class="menu-item">
                                <Link to="/dashboard">
                                    <a class="menu-link active">
                                        <span class="menu-bullet">
                                            <span class="bullet bullet-dot"></span>
                                        </span>
                                        <span class="menu-title">Tableau de bord</span>
                                    </a>
                                </Link>
                            </div>
                            <div class="menu-item">
                                <Link to={"/products"}>
                                    <a class="menu-link" href="dashboards/ecommerce.html">
                                        <span class="menu-bullet">
                                            <span class="bullet bullet-dot"></span>
                                        </span>
                                        <span class="menu-title">Produits</span>
                                    </a>
                                </Link>
                            </div>
                            <div class="menu-item">
                                <a class="menu-link" href="dashboards/projects.html">
                                    <span class="menu-bullet">
                                        <span class="bullet bullet-dot"></span>
                                    </span>
                                    <span class="menu-title">Catégories</span>
                                </a>
                            </div>
                            <div class="menu-item">
                                <a class="menu-link" href="dashboards/online-courses.html">
                                    <span class="menu-bullet">
                                        <span class="bullet bullet-dot"></span>
                                    </span>
                                    <span class="menu-title">Ventes</span>
                                </a>
                            </div>
                            <div class="menu-item">
                                <a class="menu-link" href="dashboards/online-courses.html">
                                    <span class="menu-bullet">
                                        <span class="bullet bullet-dot"></span>
                                    </span>
                                    <span class="menu-title">Commandes</span>
                                </a>
                            </div>
                            <div class="menu-item">
                                <a class="menu-link" href="dashboards/online-courses.html">
                                    <span class="menu-bullet">
                                        <span class="bullet bullet-dot"></span>
                                    </span>
                                    <span class="menu-title">Fournisseurs</span>
                                </a>
                            </div>
                            <div class="menu-item">
                                <a class="menu-link" href="dashboards/online-courses.html">
                                    <span class="menu-bullet">
                                        <span class="bullet bullet-dot"></span>
                                    </span>
                                    <span class="menu-title">Clients</span>
                                </a>
                            </div>
                            <div class="menu-item">
                                <a class="menu-link" href="dashboards/online-courses.html">
                                    <span class="menu-bullet">
                                        <span class="bullet bullet-dot"></span>
                                    </span>
                                    <span class="menu-title">Employés</span>
                                </a>
                            </div>
                            <div class="menu-item">
                                <a class="menu-link" href="dashboards/online-courses.html">
                                    <span class="menu-bullet">
                                        <span class="bullet bullet-dot"></span>
                                    </span>
                                    <span class="menu-title">Incidents</span>
                                </a>
                            </div>
                            <div class="menu-item">
                                <a class="menu-link" href="dashboards/online-courses.html">
                                    <span class="menu-bullet">
                                        <span class="bullet bullet-dot"></span>
                                    </span>
                                    <span class="menu-title">Dépenses</span>
                                </a>
                            </div>
                            <div class="menu-item">
                                <a class="menu-link" href="dashboards/online-courses.html">
                                    <span class="menu-bullet">
                                        <span class="bullet bullet-dot"></span>
                                    </span>
                                    <span class="menu-title">Paramètres</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar