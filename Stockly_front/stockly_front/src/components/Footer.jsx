import React from 'react'
const currentYear = new Date().getFullYear();


const Footer = () => {
    return (
        <>
            <div id="kt_app_footer" className="app-footer d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
                <div className="text-gray-900 order-2 order-md-1">
                    <span className="text-muted fw-semibold me-1">{currentYear}&copy;</span>
                    <a href="#" target="_blank" className="text-gray-800 text-hover-primary">Stockly | Application de gestion de stock</a>
                </div>
                <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
                    <li className="menu-item">
                        <a href="https://chainerkomissa.github.io/projet_stockly.html" target="_blank" className="menu-link px-2">A propos</a>
                    </li>
                </ul>
            </div>
        </>

    )
}

export default Footer