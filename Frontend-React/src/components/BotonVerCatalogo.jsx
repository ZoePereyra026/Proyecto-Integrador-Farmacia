import React from 'react';
import { Link } from 'react-router-dom';

export default function BotonVerCatalogo() {
  return (
    <div className="boton-volver text-center mt-4 mb-5">
      <Link to="/productos" className="btn-volver">
        Ver el catálogo
      </Link>
    </div>
  );
}
