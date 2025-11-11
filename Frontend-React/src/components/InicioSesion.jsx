import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../../css/style_form.css";

export default function InicioSesion() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(email, password);
    if (res.success) {
      setMensaje("Inicio de sesión exitoso");
      setTimeout(() => navigate("/"), 1000); 
    } else {
      setMensaje(res.error);
    }
  };

  return (
    <main className="form-section">
      <form onSubmit={handleSubmit}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Correo electrónico</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Contraseña</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Ingresar
        </button>

        {mensaje && (
          <div className={`alert ${mensaje.startsWith("Inicio") ? "alert-success" : "alert-danger"}`}>
            {mensaje}
          </div>
        )}

        <p className="mt-3 mb-2">
          ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
        </p>
      </form>
    </main>
  );
}
