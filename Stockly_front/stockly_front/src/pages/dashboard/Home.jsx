import React from 'react'
import '../styles/home.css';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Container, Button, Form, Row, Col } from 'react-bootstrap';
import { BiGridAlt, BiPackage, BiPlus, BiReceipt, BiPurchaseTagAlt, BiBuilding, BiPrinter, BiPaperPlane,BiUser, BiUserPlus, BiNotepad, BiListPlus, BiCube, BiCog, BiCartAdd } from "react-icons/bi";



function Home() {
    return (
        <>
            <Row>
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
                        {/* <Navbar.Brand href="#" className='navbarbrand'>Stockly</Navbar.Brand> */}
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
                <Col>
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
                                <Link to="/products" class="nav-link collapsed">
                                    <BiNotepad id='icon' />
                                    <span>Livraisons</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/addproduct" class="nav-link collapsed">
                                    <BiListPlus id='icon' />
                                    <span>Nouvelle livraison</span>
                                </Link>
                            </li>

                            <li class="nav-heading">FOURNISSEURS</li>
                            <li>
                                <Link to="/products" class="nav-link collapsed">
                                    <BiBuilding id='icon' />
                                    <span>Fournisseurs</span>
                                </Link>
                            </li>
                            
                            <li>
                                <Link to="/addproduct" class="nav-link collapsed">
                                    <BiPlus id='icon' />
                                    <span>Nouveau fournisseur</span>
                                </Link>
                            </li>

                            <li class="nav-heading">EMPLOYES</li>
                            <li>
                                <Link to="/products" class="nav-link collapsed">
                                    <BiUser id='icon' />
                                    <span>Employés</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/addproduct" class="nav-link collapsed">
                                    <BiUserPlus id='icon' />
                                    <span>Nouvel employé</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard" class="else">
                                    <BiCog id='elseicon' />
                                    <span>Paramètres</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" class="else">
                                    <BiGridAlt id='elseicon' />
                                    <span>Déconnexion</span>
                                </Link>
                            </li>

                        </ul>
                    </aside>
                </Col>
                <Col>
                    <Outlet id="outlet" />
                </Col>
            </Row>

        </>
    )
}

export default Home