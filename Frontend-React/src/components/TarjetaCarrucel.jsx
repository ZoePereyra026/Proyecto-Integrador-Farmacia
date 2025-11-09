import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/style_tarjetacarrucel.css';

export default function TarjetaCarrucel({ producto }) {
  return (
    <Link
      to={`/producto/${producto.id}`}
      className="text-decoration-none text-dark"
    >
      <div className="tarjeta-carrucel">
        <img
          src={producto.imagenUrl}
          alt={producto.nombre}
        />
        <div className="card-body text-center px-2">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text">${producto.precio}</p>
        </div>
      </div>
    </Link>
  );
}
