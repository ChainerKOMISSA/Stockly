import React from 'react'
import '../styles/home.css';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Container, Button, Form, Row, Col } from 'react-bootstrap';
import { BiGridAlt, BiPackage, BiPlus, BiReceipt, BiPurchaseTagAlt, BiBuilding, BiPrinter, BiPaperPlane, BiUser, BiUserPlus, BiNotepad, BiArrowFromBottom, BiListPlus, BiCube, BiCog, BiCartAdd } from "react-icons/bi";



function Home() {
    return (
        <>
            <Row>
            <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><BiArrowFromBottom/></a>

                <Navbar expand="lg" class="bg-body-tertiary" id='header'>
                    <Container fluid>
                        <Navbar.Brand href="#home" className='navbarbrand'>
                            <img
                                alt=""
                                src=""
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            Stockly
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Navbar.Collapse id="navbarScroll">
                            <Form className="d-flex" id='searchbar'>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-primary">Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Row>
            <Row>
                    <aside id="sidebar" class="sidebar">
                        <ul class="sidebar-nav" id="sidebar-nav">
                            <li>
                                <Link to="/dashboard" class="nav-link ">
                                    <BiGridAlt id='icon' />
                                    <span>Tableau de bord</span>
                                </Link>
                            </li>
                            <li class="nav-heading">PRODUITS</li>
                            <li>
                                <Link to="/products" class="nav-link collapsed">
                                    <BiCube id='icon' />
                                    <span>Produits</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/categories" class="nav-link collapsed">
                                    <BiPackage id='icon' />
                                    <span>Catégories</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/addproduct" class="nav-link collapsed">
                                    <BiPlus id='icon' />
                                    <span>Nouveau produit</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/addcategory" class="nav-link collapsed">
                                    <BiPlus id='icon' />
                                    <span>Nouvelle catégorie</span>
                                </Link>
                            </li>

                            <li class="nav-heading">VENTES</li>
                            <li>
                                <Link to="/sales" class="nav-link collapsed">
                                    <BiCube id='icon' />
                                    <span>Ventes</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/newsale" class="nav-link collapsed">
                                    <BiCartAdd id='icon' />
                                    <span>Nouvelle vente</span>
                                </Link>
                            </li>

                            <li class="nav-heading">COMMANDES</li>
                            <li>
                                <Link to="/orders" class="nav-link collapsed">
                                    <BiPurchaseTagAlt id='icon' />
                                    <span>Commandes</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/neworder" class="nav-link collapsed">
                                    <BiListPlus id='icon' />
                                    <span>Nouvelle commande</span>
                                </Link>
                            </li>

                            <li class="nav-heading">LIVRAISONS</li>
                            <li>
                                <Link to="/deliveries" class="nav-link collapsed">
                                    <BiNotepad id='icon' />
                                    <span>Livraisons</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/newdelivery" class="nav-link collapsed">
                                    <BiListPlus id='icon' />
                                    <span>Nouvelle livraison</span>
                                </Link>
                            </li>

                            <li class="nav-heading">FOURNISSEURS</li>
                            <li>
                                <Link to="/suppliers" class="nav-link collapsed">
                                    <BiBuilding id='icon' />
                                    <span>Fournisseurs</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/newsupplier" class="nav-link collapsed">
                                    <BiPlus id='icon' />
                                    <span>Nouveau fournisseur</span>
                                </Link>
                            </li>

                            <li class="nav-heading">EMPLOYES</li>
                            <li>
                                <Link to="/employees" class="nav-link collapsed">
                                    <BiUser id='icon' />
                                    <span>Employés</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/newemployee" class="nav-link collapsed">
                                    <BiUserPlus id='icon' />
                                    <span>Nouvel employé</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" class="nav-link collapsed">
                                    <BiCog id='icon' />
                                    <span>Paramètres</span>
                                </Link>
                            </li>
                        </ul>
                    </aside>
                <Col id='contentcol'>
                    <Row id="outlet">
                        <Outlet />
                    </Row>
                    <Row id='footerrow'>
                        <footer id="footer" class="footer">
                            <div class="copyright">
                                &copy; Copyright <strong><span>Stockly</span></strong>. Tous droits réservés
                            </div>
                            <div class="credits">
                                Credits to <a href="">Chainer KOMISSA ZOTSU</a>
                            </div>
                        </footer>
                    </Row>
                </Col>
            </Row>

        </>
    )
}

export default Home