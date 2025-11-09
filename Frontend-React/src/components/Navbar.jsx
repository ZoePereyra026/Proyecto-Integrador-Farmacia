import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
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
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold text-success d-flex align-items-center" to="/">
          <img src="/img/logo.png" alt="Logo" width="30" className="me-2" />
          Farmacia San Martín
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto"></ul>
          <ul className="navbar-nav">
            <li className="nav-item d-flex align-items-center">
              <Link className="nav-link position-relative" to="/carrito">
                <div style={{ position: 'relative', paddingTop: '4px', minWidth: '32px' }}>
                  <i
                    className="fas fa-shopping-cart"
                    style={{ color: "#00AEEF", fontSize: '1.2rem' }}
                  ></i>
                  <span
                    id="contadorCarrito"
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                    style={{
                      fontSize: '0.75rem',
                      minWidth: '18px',
                      height: '18px',
                      padding: '0 6px',
                      display: 'inline-block',
                      textAlign: 'center',
                      lineHeight: '18px',
                      whiteSpace: 'nowrap'
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
