import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Cart from '../Scenes/Cart';
import Modal from '../Modal';
import { useCart } from './ContextReducer';

function Navbar() {
    let data = useCart();
    const [cartView, setCartView] = useState(false);
    const [navbarOpen, setNavbarOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const toggleNavbar = () => {
        setNavbarOpen(!navbarOpen);
    };

    const closeNavbar = () => {
        setNavbarOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-success">
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 fst-italic text-primary" to="/" onClick={closeNavbar}>
                    Sachin
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNavbar}
                    aria-controls="navbarNav"
                    aria-expanded={navbarOpen ? 'true' : 'false'}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={'collapse navbar-collapse ' + (navbarOpen ? 'show' : '')} id="navbarNav">
                    <ul className="navbar-nav me-auto" onClick={closeNavbar}>
                        <li className="nav-item">
                            <Link className="nav-link active fs-4" aria-current="page" to="/">
                                Home
                            </Link>
                        </li>
                        {localStorage.getItem('authToken') ? (
                            <li className="nav-item">
                                <Link className="nav-link active fs-4 " aria-current="page" to="/myOrder">
                                    MyOrders
                                </Link>
                            </li>
                        ) : (
                            ''
                        )}
                    </ul>

                    {!localStorage.getItem('authToken') ? (
                        <div className="d-flex">
                            <Link className="btn bg-black text-white mx-1" to="/CreateUser" onClick={closeNavbar}>
                                SignUp
                            </Link>
                            <Link className="btn bg-black text-white mx-1" to="/login" onClick={closeNavbar}>
                                Login
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div
                                className="btn bg-black text-sucess mx-2"
                                onClick={() => {
                                    setCartView(true);
                                    closeNavbar();
                                }}
                            >
                                MyCart{' '}
                                <Badge pill bg="danger">
                                    {' '}
                                    {data.length}{' '}
                                </Badge>
                            </div>
                            {cartView ? (
                                <Modal onClose={() => setCartView(false)}>
                                    <Cart />
                                </Modal>
                            ) : null}

                            <div className="btn bg-danger text-white mx-2" onClick={handleLogout}>
                                logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;