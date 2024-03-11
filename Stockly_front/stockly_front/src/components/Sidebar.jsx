import React from 'react'
import { Link } from 'react-router-dom'
// import './Sidebar.css'


const Sidebar = () => {
    return (
        <>
            <div id="kt_app_sidebar" className="app-sidebar flex-column flex-shrink-0" data-kt-drawer="true" data-kt-drawer-name="app-sidebar" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="auto" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle">
                <div className="card py-5 bg-gray-200" data-kt-sticky="true" data-kt-sticky-name="app-sidebar-menu-sticky" data-kt-sticky-offset="{default: false, xl: '500px'}" data-kt-sticky-width="250px" data-kt-sticky-left="auto" data-kt-sticky-top="100px" data-kt-sticky-animation="false" data-kt-sticky-zindex="95">
                    <div className="hover-scroll-y mx-2 px-1 px-lg-2" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_app_header, #kt_app_footer" data-kt-scroll-wrappers="#kt_app_toolbar" data-kt-scroll-offset="5px">
                        <div id="kt_app_sidebar_menu" data-kt-menu="true" className="menu menu-sub-indention menu-rounded menu-column menu-active-bg menu-title-gray-600 menu-icon-gray-500 menu-state-primary menu-arrow-gray-500 fw-semibold fs-6">
                            <div className="menu-item">
                                <div className="menu-content">
                                    <span className="menu-section fs-5 fw-bolder ps-1 py-1">Accueil</span>
                                </div>
                            </div>
                            <div className="menu-item">
                                <a className="menu-link active" href="/dashboard">
                                    <span className="menu-bullet">
                                        <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Tableau de bord</span>
                                </a>
                            </div>
                            <div className="menu-item">
                                <a className="menu-link" href="/suppliers">
                                    <span className="menu-bullet">
                                        <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Fournisseurs</span>
                                </a>
                            </div>
                            <div className="menu-item">
                                <a className="menu-link" href="/employees">
                                    <span className="menu-bullet">
                                        <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Employés</span>
                                </a>
                            </div>
                            <div className="menu-item">
                                <a className="menu-link" href="incidents">
                                    <span className="menu-bullet">
                                        <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Incidents</span>
                                </a>
                            </div>
                            <div className="menu-item">
                                <a className="menu-link" href="depenses">
                                    <span className="menu-bullet">
                                        <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Dépenses</span>
                                </a>
                            </div>
                            <div className="menu-item">
                                <a className="menu-link" href="#">
                                    <span className="menu-bullet">
                                        <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Paramètres</span>
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