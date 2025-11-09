import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/style_navbar.css';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [query, setQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const mostrarBuscador =
  location.pathname === '/productos';
  
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="../public/img/logo.png" alt="Logo" width="30" className="me-2" />
          <span className="fw-bold text-success">Farmacia San Martín</span>
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
          {mostrarBuscador && (
            <form
              className="buscador-wrapper d-flex align-items-center gap-2 me-auto"
              role="search"
              onSubmit={handleSearch}
            >
              <input
                className="form-control buscador"
                type="search"
                name="q"
                placeholder="¿Qué estás buscando?"
                aria-label="Buscar"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-success" type="submit">Buscar</button>
            </form>
          )}

          <ul className="navbar-nav ms-auto">
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
