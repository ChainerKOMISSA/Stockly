import React from 'react'
// import '../styles/home.css';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Container, Button, Form, Row, Col } from 'react-bootstrap';
import { BiGridAlt, BiPackage, BiPlus, BiPurchaseTagAlt, BiBuilding, BiUser, BiUserPlus, BiNotepad, BiArrowFromBottom, BiListPlus, BiCube, BiCart, BiCog, BiCartAdd } from "react-icons/bi";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';



function Home() {
    return (
        <>
            <div id="kt_app_body" data-kt-app-header-stacked="true" data-kt-app-header-primary-enabled="true" data-kt-app-header-secondary-enabled="true" data-kt-app-sidebar-enabled="true" data-kt-app-sidebar-fixed="false" data-kt-app-toolbar-enabled="true" className="app-default"  >
                <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
                    {/*begin::Page*/}
                    <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
                        {/*begin::Header*/}
                        <Header />
                        {/*end::Header*/}
                        {/*begin::Wrapper*/}
                        <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper" >
                            {/*begin::Wrapper container*/}
                            <div className="app-container container-fluid d-flex">
                                {/*begin::Sidebar*/}
                                <Sidebar />
                                {/*end::Sidebar*/}
                                {/*begin::Main*/}
                                <div className="app-main flex-column flex-row-fluid" id="kt_app_main" style={{ minHeight: "800px" }}>
                                    {/*begin::Content wrapper*/}
                                    <div className="d-flex flex-column flex-column-fluid">
                                        <Outlet />
                                    </div>
                                    {/*end::Content wrapper*/}
                                    {/*begin::Footer*/}
                                    <Footer />
                                    {/*end::Footer*/}
                                </div>
                                {/*end:::Main*/}
                            </div>
                            {/*end::Wrapper container*/}
                        </div>
                        {/*end::Wrapper*/}
                    </div>
                    {/*end::Page*/}
                </div>
            </div>


        </>
    )
}

export default Home