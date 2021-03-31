import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const params: any = useParams();
    const page = params.page || '/analisis-vectorial-escom';

    return (
        <nav className="navbar">
            <Link className="title" to="/analisis-vectorial-escom">Análisis Vectorial</Link>
            <div className="links">
                <Link to="/analisis-vectorial-escom/primer-programa" className={page === 'analisis-vectorial-escom/primer-programa' ? 'active-link' : ''}>Primer Programa</Link>
                <Link to="/analisis-vectorial-escom/segundo-programa" className={page === 'analisis-vectorial-escom/segundo-programa' ? 'active-link' : ''}>Segundo Programa</Link>
                <Link to="/analisis-vectorial-escom/acerca-de" className={page === 'analisis-vectorial-escom/acerca-de' ? 'active-link' : ''}>Acerca De</Link>
            </div>
        </nav>
    );
};

export default Navbar;