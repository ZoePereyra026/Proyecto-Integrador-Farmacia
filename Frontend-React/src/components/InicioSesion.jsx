import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/style_form.css';

export default function InicioSesion() {
  return (
    <main className="form-section">
      <form>
        <Link to="/">
          <img src="/img/Logo.png" alt="Logo Farmacia San Martín" className="form-logo" />
        </Link>

        <h1 className="form-title">Iniciar Sesión</h1>

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

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Ingresar
        </button>

        <p className="mt-3 mb-2">
          ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
        </p>
      </form>
    </main>
  );
}
