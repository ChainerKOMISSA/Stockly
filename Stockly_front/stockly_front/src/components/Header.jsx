import { React, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.jpg'
import avatar from '../assets/img/profile-img.jpg'


const Header = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState("");

    const navigation = (destination) => {
        setActiveMenu(destination)
        navigate("/" + destination);
    }




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
                                    <img alt="Logo" src={logo} className="h-70px h-lg-70px theme-light-show" />
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
                                        <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="bottom-start" data-kt-menu-offset="-250,0" class="menu-item here show menu-here-bg menu-lg-down-accordion me-0 me-lg-2">
                                            <span class="menu-link">
                                                <span class="menu-title">Accueil</span>
                                                <span class="menu-arrow d-lg-none"></span>
                                            </span>
                                        </div>
                                        <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="bottom-start" data-kt-menu-offset="-400,0" class="menu-item menu-lg-down-accordion me-0 me-lg-2">
                                            <span class="menu-link" onClick={() => navigation("products")}>
                                                <span class="menu-title">Produits</span>
                                                <span class="menu-arrow d-lg-none"></span>
                                            </span>
                                        </div>
                                        <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="bottom-start" data-kt-menu-offset="-400,0" class="menu-item menu-lg-down-accordion me-0 me-lg-2">
                                            <span class="menu-link" onClick={() => navigation("categories")}>
                                                <span class="menu-title">Catégories</span>
                                                <span class="menu-arrow d-lg-none"></span>
                                            </span>
                                        </div>
                                        <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="bottom-start" data-kt-menu-offset="-400,0" class="menu-item menu-lg-down-accordion me-0 me-lg-2">
                                            <span class="menu-link" onClick={() => navigation("sales")}>
                                                <span class="menu-title">Ventes</span>
                                                <span class="menu-arrow d-lg-none"></span>
                                            </span>
                                        </div>
                                        <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="bottom-start" data-kt-menu-offset="-400,0" class="menu-item menu-lg-down-accordion me-0 me-lg-2">
                                            <span class="menu-link" onClick={() => navigation("orders")}>
                                                <span class="menu-title">Commandes</span>
                                                <span class="menu-arrow d-lg-none"></span>
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
                                <div className="app-navbar-item ms-2 ms-md-5" id="kt_header_user_menu_toggle">
                                    {/*begin::Menu wrapper*/}
                                    <div className="cursor-pointer symbol symbol-35px symbol-md-40px" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                                        <img className="symbol symbol-35px symbol-md-40px" src={avatar} alt="user" />
                                    </div>
                                    {/* <!--begin::User account menu--> */}
                                    <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px" data-kt-menu="true">
                                        {/* <!--begin::Menu item--> */}
                                        <div className="menu-item px-3">
                                            <div className="menu-content d-flex align-items-center px-3">
                                                {/* <!--begin::Avatar--> */}
                                                <div className="symbol symbol-50px me-5">
                                                    <img alt="Logo" src={avatar} />
                                                </div>
                                                {/* <!--end::Avatar--> */}
                                                {/* <!--begin::Username--> */}
                                                <div className="d-flex flex-column">
                                                    <div className="fw-bold d-flex align-items-center fs-5">Max Smith
                                                        <span className="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">Pro</span></div>
                                                    <a href="#" className="fw-semibold text-muted text-hover-primary fs-7">max@kt.com</a>
                                                </div>
                                                {/* <!--end::Username--> */}
                                            </div>
                                        </div>
                                        {/* <!--end::Menu item--> */}
                                        {/* <!--begin::Menu separator--> */}
                                        <div className="separator my-2"></div>
                                        {/* <!--end::Menu separator--> */}
                                        {/* <!--begin::Menu item--> */}
                                        <div className="menu-item px-5">
                                            <a href="account/overview.html" className="menu-link px-5">My Profile</a>
                                        </div>
                                        {/* <!--end::Menu item--> */}
                                        {/* <!--begin::Menu item--> */}
                                        <div className="menu-item px-5">
                                            <a href="apps/projects/list.html" className="menu-link px-5">
                                                <span className="menu-text">My Projects</span>
                                                <span className="menu-badge">
                                                    <span className="badge badge-light-danger badge-circle fw-bold fs-7">3</span>
                                                </span>
                                            </a>
                                        </div>
                                        {/* <!--end::Menu item--> */}
                                        {/* <!--begin::Menu item--> */}
                                        <div className="menu-item px-5" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0">
                                            <a href="#" className="menu-link px-5">
                                                <span className="menu-title">My Subscription</span>
                                                <span className="menu-arrow"></span>
                                            </a>
                                            {/* <!--begin::Menu sub--> */}
                                            <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="account/referrals.html" className="menu-link px-5">Referrals</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="account/billing.html" className="menu-link px-5">Billing</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="account/statements.html" className="menu-link px-5">Payments</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="account/statements.html" className="menu-link d-flex flex-stack px-5">Statements
                                                        <span className="ms-2 lh-0" data-bs-toggle="tooltip" title="View your statements">
                                                            <i className="ki-outline ki-information-5 fs-5"></i>
                                                        </span></a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu separator--> */}
                                                <div className="separator my-2"></div>
                                                {/* <!--end::Menu separator--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <div className="menu-content px-3">
                                                        <label className="form-check form-switch form-check-custom form-check-solid">
                                                            <input className="form-check-input w-30px h-20px" type="checkbox" value="1" checked="checked" onChange={() => { }} name="notifications" />
                                                            <span className="form-check-label text-muted fs-7">Notifications</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                            </div>
                                            {/* <!--end::Menu sub--> */}
                                        </div>
                                        {/* <!--end::Menu item--> */}
                                        {/* <!--begin::Menu item--> */}
                                        <div className="menu-item px-5">
                                            <a href="account/statements.html" className="menu-link px-5">My Statements</a>
                                        </div>
                                        {/* <!--end::Menu item--> */}
                                        {/* <!--begin::Menu separator--> */}
                                        <div className="separator my-2"></div>
                                        {/* <!--end::Menu separator--> */}
                                        {/* <!--begin::Menu item--> */}
                                        <div className="menu-item px-5" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0">
                                            <a href="#" className="menu-link px-5">
                                                <span className="menu-title position-relative">Mode
                                                    <span className="ms-5 position-absolute translate-middle-y top-50 end-0">
                                                        <i className="ki-outline ki-night-day theme-light-show fs-2"></i>
                                                        <i className="ki-outline ki-moon theme-dark-show fs-2"></i>
                                                    </span></span>
                                            </a>
                                            {/* <!--begin::Menu--> */}
                                            <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-gray-500 menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px" data-kt-menu="true" data-kt-element="theme-mode-menu">
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3 my-0">
                                                    <a href="#" className="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="light">
                                                        <span className="menu-icon" data-kt-element="icon">
                                                            <i className="ki-outline ki-night-day fs-2"></i>
                                                        </span>
                                                        <span className="menu-title">Light</span>
                                                    </a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3 my-0">
                                                    <a href="#" className="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="dark">
                                                        <span className="menu-icon" data-kt-element="icon">
                                                            <i className="ki-outline ki-moon fs-2"></i>
                                                        </span>
                                                        <span className="menu-title">Dark</span>
                                                    </a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3 my-0">
                                                    <a href="#" className="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="system">
                                                        <span className="menu-icon" data-kt-element="icon">
                                                            <i className="ki-outline ki-screen fs-2"></i>
                                                        </span>
                                                        <span className="menu-title">System</span>
                                                    </a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                            </div>
                                            {/* <!--end::Menu--> */}
                                        </div>
                                        {/* <!--end::Menu item--> */}
                                        {/* <!--begin::Menu item--> */}
                                        <div className="menu-item px-5" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0">
                                            <a href="#" className="menu-link px-5">
                                                <span className="menu-title position-relative">Language
                                                    <span className="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0">English
                                                        <img className="w-15px h-15px rounded-1 ms-2" src="assets/media/flags/united-states.svg" alt="" /></span></span>
                                            </a>
                                            {/* <!--begin::Menu sub--> */}
                                            <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="account/settings.html" className="menu-link d-flex px-5 active">
                                                        <span className="symbol symbol-20px me-4">
                                                            <img className="rounded-1" src="assets/media/flags/united-states.svg" alt="" />
                                                        </span>English</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="account/settings.html" className="menu-link d-flex px-5">
                                                        <span className="symbol symbol-20px me-4">
                                                            <img className="rounded-1" src="assets/media/flags/spain.svg" alt="" />
                                                        </span>Spanish</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="account/settings.html" className="menu-link d-flex px-5">
                                                        <span className="symbol symbol-20px me-4">
                                                            <img className="rounded-1" src="assets/media/flags/germany.svg" alt="" />
                                                        </span>German</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="account/settings.html" className="menu-link d-flex px-5">
                                                        <span className="symbol symbol-20px me-4">
                                                            <img className="rounded-1" src="assets/media/flags/japan.svg" alt="" />
                                                        </span>Japanese</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="account/settings.html" className="menu-link d-flex px-5">
                                                        <span className="symbol symbol-20px me-4">
                                                            <img className="rounded-1" src="assets/media/flags/france.svg" alt="" />
                                                        </span>French</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                            </div>
                                            {/* <!--end::Menu sub--> */}
                                        </div>
                                        {/* <!--end::Menu item--> */}
                                        {/* <!--begin::Menu item--> */}
                                        <div className="menu-item px-5 my-1">
                                            <a href="account/settings.html" className="menu-link px-5">Account Settings</a>
                                        </div>
                                        {/* <!--end::Menu item--> */}
                                        {/* <!--begin::Menu item--> */}
                                        <div className="menu-item px-5">
                                            <a href="authentication/layouts/corporate/sign-in.html" className="menu-link px-5">Sign Out</a>
                                        </div>
                                        {/* <!--end::Menu item--> */}
                                    </div>
                                    {/* <!--end::User account menu--> */}
                                    {/*end::Menu wrapper*/}
                                </div>
                                {/*end::User menu*/}
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