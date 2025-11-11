import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/style_navbar.css';
import BotonVerCatalogo from './BotonVerCatalogo';

export default function Navbar({ busqueda, setBusqueda }) {
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState(null);
  const location = useLocation();

  const mostrarBuscador = location.pathname === '/productos';
  const esCarrito = location.pathname === '/carrito';
  const esLogin = location.pathname === '/login';
  const esRegistro = location.pathname === '/registro';
  const soloLogo = esLogin || esRegistro;
  const hayCarrito = cartCount > 0;

  useEffect(() => {
    const actualizarContadorYUsuario = () => {
      try {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        setUsername(usuario?.username || usuario?.nombre || usuario?.email || null);

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = Array.isArray(cart)
          ? cart.reduce((acc, item) => acc + (item.qty || 1), 0)
          : 0;
        setCartCount(totalItems);
      } catch (error) {
        console.error("Error leyendo carrito o usuario:", error);
        setCartCount(0);
        setUsername(null);
      }
    };

    actualizarContadorYUsuario();
    window.addEventListener('carritoActualizado', actualizarContadorYUsuario);
    return () => window.removeEventListener('carritoActualizado', actualizarContadorYUsuario);
  }, []);

  const handleSearch = (e) => e.preventDefault();

  const cerrarSesion = () => {
    if (window.confirm("¿Deseás cerrar sesión?")) {
      localStorage.removeItem("usuario");
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("carritoActualizado"));
      setUsername(null);
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg ${esCarrito || soloLogo ? 'minimal' : 'navbar-light bg-light border-bottom'}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/img/Logo.png" alt="Logo Farmacia San Martín" width="30" className="me-2" />
          <span className="fw-bold text-success">Farmacia San Martín</span>
        </Link>

        {soloLogo ? null : esCarrito ? (
          hayCarrito && (
            <div className="ms-auto navbar-catalogo">
              <BotonVerCatalogo />
            </div>
          )
        ) : (
          <>
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
                  {username && (
                    <span className="fw-bold text-success me-2" style={{ paddingBottom: '20px' }}>
                      {username}
                    </span>
                  )}

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

                  {!username ? (
                    <Link className="nav-link fw-bold text-success" to="/login" style={{ paddingBottom: '30px' }}>
                      Iniciar Sesión
                    </Link>
                  ) : (
                    <button className="btn btn-success fw-bold ms-2" onClick={cerrarSesion} style={{ marginBottom: '20px' }}>
                      Cerrar Sesión
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
