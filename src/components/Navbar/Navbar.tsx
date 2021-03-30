import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const params: any = useParams();
    const page = params.page || '/';

    return (
        <nav className="navbar">
            <Link className="title" to="/">Análisis Vectorial</Link>
            <div className="links">
                <Link to="/primer-programa" className={page === 'primer-programa' ? 'active-link' : ''}>Primer Programa</Link>
                <Link to="/segundo-programa" className={page === 'segundo-programa' ? 'active-link' : ''}>Segundo Programa</Link>
                <Link to="/acerca-de" className={page === 'acerca-de' ? 'active-link' : ''}>Acerca De</Link>
            </div>
        </nav>
    );
};

export default Navbar;