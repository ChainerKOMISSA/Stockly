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
                            {/*end::Menu wrapper*/}
                            {/*begin::Navbar*/}
                            <div className="app-navbar flex-shrink-0">
                                {/*begin::User menu*/}
                                <div className="app-navbar-item ms-2 ms-md-5 position-relative" id="kt_header_user_menu_toggle">
                                    <div onClick={toggleModal} className="cursor-pointer symbol symbol-35px symbol-md-40px">
                                        <img className="symbol symbol-35px symbol-md-40px" src={avatar} alt="user" />
                                    </div>
                                    {isModalOpen && (
                                        <div className="modal fade show position-relative"  tabIndex="-1" role="dialog" style={{ display: 'flex', flexDirection : 'column', height : '300%', marginTop : '120%'}}>
                                            <div className="modal-dialog" role="document" style={{ maxWidth: '300px' }}>
                                                <div className="modal-content">
                                                    <div className="modal-body">
                                                        <div className="menu-item px-3">
                                                            <div className="menu-content d-flex align-items-center px-3">
                                                                <div className="symbol symbol-50px me-5">
                                                                    <img alt="Logo" src={avatar} />
                                                                </div>
                                                                <div className="d-flex flex-column">
                                                                    <div className="fw-bold d-flex align-items-center fs-5">Max Smith
                                                                        <span className="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">Pro</span></div>
                                                                    <a className="fw-semibold text-muted text-hover-primary fs-7">max@kt.com</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="separator my-2"></div>
                                                        <div className="menu-item px-5">
                                                            <a href="/profil" className="menu-link px-5">Mon profil</a>
                                                        </div>
                                                        <div className="menu-item px-5">
                                                            <a href="#" className="menu-link px-5">
                                                                <span className="menu-text">Mes ventes</span>
                                                                <span className="menu-badge">
                                                                    <span className="badge badge-light-danger badge-circle fw-bold fs-7">3</span>
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="separator my-2"></div>
                                                        <div className="menu-item px-5" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0">
                                                            <a href="#" className="menu-link px-5">
                                                                <span className="menu-title position-relative">Mode
                                                                    <span className="ms-5 position-absolute translate-middle-y top-50 end-0">
                                                                        <i className="ki-outline ki-night-day theme-light-show fs-2"></i>
                                                                        <i className="ki-outline ki-moon theme-dark-show fs-2"></i>
                                                                    </span></span>
                                                            </a>
                                                            <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-gray-500 menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px" data-kt-menu="true" data-kt-element="theme-mode-menu">
                                                                <div className="menu-item px-3 my-0">
                                                                    <a href="#" className="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="light">
                                                                        <span className="menu-icon" data-kt-element="icon">
                                                                            <i className="ki-outline ki-night-day fs-2"></i>
                                                                        </span>
                                                                        <span className="menu-title">Clair</span>
                                                                    </a>
                                                                </div>
                                                                <div className="menu-item px-3 my-0">
                                                                    <a href="#" className="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="dark">
                                                                        <span className="menu-icon" data-kt-element="icon">
                                                                            <i className="ki-outline ki-moon fs-2"></i>
                                                                        </span>
                                                                        <span className="menu-title">Sombre</span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="menu-item px-5">
                                                            <a href="#" className="menu-link px-5">Me déconnecter</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/*end::Navbar*/}
                        </div>
                        {/*end::Header primary*/}
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