import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/style_navbar.css';

export default function Navbar({ busqueda, setBusqueda }) {
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const mostrarBuscador = location.pathname === '/productos';

  useEffect(() => {
    const actualizarContador = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = Array.isArray(cart)
          ? cart.reduce((acc, item) => acc + (item.qty || 1), 0)
          : 0;
        setCartCount(totalItems);
      } catch (error) {
        console.error("Error leyendo carrito:", error);
        setCartCount(0);
      }
    };

    actualizarContador();
    window.addEventListener('carritoActualizado', actualizarContador);
    return () => window.removeEventListener('carritoActualizado', actualizarContador);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container" style={{ marginTop: '20px' }}>
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="../public/img/logo.png" alt="Logo" width="30" className="me-2" />
          <span className="fw-bold text-success">Farmacia San Martín</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {mostrarBuscador && (
            <form className="buscador-wrapper d-flex align-items-center gap-2 me-auto" onSubmit={handleSearch}>
              <input
                className="form-control buscador"
                type="search"
                placeholder="¿Qué estás buscando?"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button className="btn btn-success" type="submit">Buscar</button>
            </form>
          )}

          <ul className="navbar-nav ms-auto">
            <li className="nav-item d-flex align-items-center">
              <Link className="nav-link position-relative" to="/carrito">
                <div style={{ position: 'relative', minWidth: '40px', height: '40px' }}>
                  <i className="fas fa-shopping-cart" style={{ color: "#00AEEF", fontSize: '1.5rem' }}></i>
                  <span
                    id="contadorCarrito"
                    className="position-absolute"
                    style={{
                      top: '-10px',
                      right: '-10px',
                      backgroundColor: '#00AEEF',
                      color: 'white',
                      fontWeight: 'bold',
                      padding: '6px',
                      fontSize: '1rem',
                      borderRadius: '50%',
                      minWidth: '28px',
                      height: '28px',
                      lineHeight: '16px',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      display: 'inline-block',
                    }}
                  >
                    {cartCount}
                  </span>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/sesion">Iniciar Sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
