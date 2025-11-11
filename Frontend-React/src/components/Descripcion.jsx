import React from 'react';

export default function Descripcion() {
  return (
    <>
      <section className="hero-section text-white text-center py-5">
        <div className="container">
          <img
            src="/img/Logo.png"
            alt="Logo Farmacia San Martín"
            className="img-fluid mb-3"
            style={{ maxWidth: '200px' }}
          />
          <h1 className="display-5">Bienvenidos a Farmacia San Martín</h1>
          <p className="lead">Tu salud, nuestra prioridad</p>
        </div>
      </section>
    </>
  );
}
