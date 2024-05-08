import { React, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png'
import avatar from '../assets/img/profile-img.jpg'

const Header = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigation = (destination) => {
        setActiveMenu(destination)
        navigate("/" + destination);
    }

    const toggleMenu = () => {
        console.log('Menu toggled');
        setIsMenuOpen(!isMenuOpen);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fonction pour ouvrir ou fermer la modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };




    return (
        <>
            <div id="kt_app_header" className="app-header">
                {/*begin::Header primary*/}
                <div className="app-header-primary" data-kt-sticky="true" data-kt-sticky-name="app-header-primary-sticky" data-kt-sticky-offset="{default: 'false', lg: '300px'}" >
                    {/*begin::Header primary container*/}
                    <div className="app-container container-fluid d-flex align-items-stretch justify-content-between" id="kt_app_header_primary_container">
                        {/*begin::Header primary*/}
                        <div className="d-flex align-items-center align-items-stretch justify-content-between flex-row-fluid" id="kt_app_header_wrapper">
                            {/*begin::Header logo*/}
                            <div className="app-header-logo d-flex align-items-center">
                                {/*begin::Mobile toggle*/}
                                <div className="btn btn-icon btn-color-gray-500 btn-active-color-primary w-35px h-35px ms-n3 me-2 d-flex d-lg-none" id="kt_app_header_menu_toggle">
                                    <i className="ki-outline ki-abstract-14 fs-1"></i>
                                </div>
                                {/*end::Mobile toggle*/}
                                {/*begin::Logo image*/}
                                <Link to={"/"}>
                                    <img alt="Logo" src={logo} className="h-100px h-lg-100px theme-light-show" />
                                </Link>
                                {/*end::Logo image*/}
                            </div>
                            {/*end::Header logo*/}
                            {/*begin::Menu wrapper*/}
                            <div className="d-flex align-items-stretch" id="kt_app_header_menu_wrapper">
                                {/*begin::Menu holder*/}
                                <div className="app-header-menu app-header-mobile-drawer align-items-stretch" data-kt-drawer="true" data-kt-drawer-name="app-header-menu" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_app_header_menu_toggle" data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_menu_wrapper'}">
                                    {/*begin::Menu*/}
                                    <div className="menu menu-rounded menu-column menu-lg-row menu-active-bg menu-title-gray-600 menu-state-gray-900 menu-arrow-gray-500 fw-semibold fw-semibold fs-6 align-items-stretch my-5 my-lg-0 px-2 px-lg-0" id="#kt_app_header_menu" data-kt-menu="true">
                                        <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="bottom-start" data-kt-menu-offset="-250,0" className="menu-item here show menu-here-bg menu-lg-down-accordion me-0 me-lg-2">
                                            <span className="menu-link" onClick={() => navigation("")}>
                                                <span className="menu-title">Accueil</span>
                                                <span className="menu-arrow d-lg-none"></span>
                                            </span>
                                        </div>
                                        <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="bottom-start" data-kt-menu-offset="-400,0" className="menu-item menu-lg-down-accordion me-0 me-lg-2">
                                            <span className="menu-link" onClick={() => navigation("products")}>
                                                <span className="menu-title">Produits</span>
                                                <span className="menu-arrow d-lg-none"></span>
                                            </span>
                                        </div>
                                        <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="bottom-start" data-kt-menu-offset="-400,0" className="menu-item menu-lg-down-accordion me-0 me-lg-2">
                                            <span className="menu-link" onClick={() => navigation("categories")}>
                                                <span className="menu-title">Catégories</span>
                                                <span className="menu-arrow d-lg-none"></span>
                                            </span>
                                        </div>
                                        <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="bottom-start" data-kt-menu-offset="-400,0" className="menu-item menu-lg-down-accordion me-0 me-lg-2">
                                            <span className="menu-link" onClick={() => navigation("sales")}>
                                                <span className="menu-title">Ventes</span>
                                                <span className="menu-arrow d-lg-none"></span>
                                            </span>
                                        </div>
                                        <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="bottom-start" data-kt-menu-offset="-400,0" className="menu-item menu-lg-down-accordion me-0 me-lg-2">
                                            <span className="menu-link" onClick={() => navigation("orders")}>
                                                <span className="menu-title">Commandes</span>
                                                <span className="menu-arrow d-lg-none"></span>
                                            </span>
                                        </div>
                                        <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="bottom-start" data-kt-menu-offset="-400,0" className="menu-item menu-lg-down-accordion me-0 me-lg-2">
                                            <span className="menu-link" onClick={() => navigation("deliveries")}>
                                                <span className="menu-title">Livraisons</span>
                                                <span className="menu-arrow d-lg-none"></span>
                                            </span>
                                        </div>
                                    </div>
                                    {/*end::Menu*/}
                                </div>
                                {/*end::Menu holder*/}
                            </div>
                            <div className="app-navbar flex-shrink-0">
                                <div className="app-navbar-item ms-2 ms-md-5 position-relative">
                                    <div onClick={toggleModal} hidden={false} className="cursor-pointer symbol symbol-35px symbol-md-40px">
                                        <i className="ki-outline ki-sun text-gray-500 fs-1"></i>
                                    </div>
                                </div>
                                <div className="app-navbar-item ms-2 ms-md-5 position-relative">
                                    <div onClick={toggleModal} hidden = {true} className="cursor-pointer symbol symbol-35px symbol-md-40px">
                                        <i className="ki-outline ki-moon text-gray-500 fs-1"></i>
                                    </div>
                                </div>
                                <div className="app-navbar-item ms-2 ms-md-5 position-relative">
                                    <div onClick={toggleModal} className="cursor-pointer symbol symbol-35px symbol-md-40px">
                                        <i className="ki-outline ki-entrance-left text-danger fs-1"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*end::Header primary container*/}
                </div>
                {/*end::Header primary*/}
                {/*begin::Header secondary*/}
                <div className="app-header-secondary">

                </div>
                {/*end::Header secondary*/}
            </div>

        </>
    )
}

export default Header