import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../../css/style_form.css";

export default function DetalleRegistro() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMensaje("Las contraseñas no coinciden");
      return;
    }

    const id = Date.now();
    const res = await register(id, nombre, email, password);
    if (res.success) {
      setMensaje("Usuario registrado con éxito");
      setTimeout(() => navigate("/login"), 1000);
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

        <h1 className="form-title">Crear Cuenta</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <label htmlFor="nombre">Nombre completo</label>
        </div>

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

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Registrarse
        </button>

        {mensaje && (
          <div className={`alert ${mensaje.startsWith("Usuario registrado") ? "alert-success" : "alert-danger"}`}>
            {mensaje}
          </div>
        )}

        <p className="mt-3 mb-2">
          ¿Ya tenés cuenta? <Link to="/login">Iniciar Sesión</Link>
        </p>
      </form>
    </main>
  );
}
