import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/style_form.css';

export default function DetalleRegistro() {
  return (
    <main className="form-section">
      <form>
        <Link to="/">
          <img src="/img/Logo.png" alt="Logo Farmacia San Martín" className="form-logo" />
        </Link>

        <h1 className="form-title">Crear Cuenta</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="Nombre completo"
          />
          <label htmlFor="nombre">Nombre completo</label>
        </div>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="correo@ejemplo.com"
          />
          <label htmlFor="email">Correo electrónico</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Contraseña"
          />
          <label htmlFor="password">Contraseña</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirmar contraseña"
          />
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Registrarse
        </button>

        <p className="mt-3 mb-2">
          ¿Ya tenés cuenta? <Link to="/login">Iniciar Sesión</Link>
        </p>
      </form>
    </main>
  );
}
