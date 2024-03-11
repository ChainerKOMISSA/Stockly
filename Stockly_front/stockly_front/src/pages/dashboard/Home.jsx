import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BiGridAlt, BiPackage, BiPlus, BiPurchaseTagAlt, BiBuilding, BiUser, BiUserPlus, BiNotepad, BiArrowFromBottom, BiListPlus, BiCube, BiCart, BiCog, BiCartAdd } from "react-icons/bi";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';




function Home() {
    return (
        <>
            <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
                <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
                    <Header />
                    <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                        <div className="app-container container-fluid d-flex">
                            <Sidebar />
                            <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                                <div className="d-flex flex-column flex-column-fluid">
                                    <Outlet />
                                </div>
                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home