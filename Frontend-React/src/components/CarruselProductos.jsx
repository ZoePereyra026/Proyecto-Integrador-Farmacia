import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProductos from '../hooks/useProductos';
import TarjetaCarrucel from './TarjetaCarrucel';
import '/css/style_carrucel.css';

export default function CarrucelProductos() {
  const productos = useProductos() || [];
  const [inicio, setInicio] = useState(0);
  const [cantidadVisible, setCantidadVisible] = useState(3);
  const total = productos.length;

  useEffect(() => {
    const actualizarCantidad = () => {
      const ancho = window.innerWidth;
      if (ancho < 768) {
        setCantidadVisible(1);
      } else if (ancho < 992) {
        setCantidadVisible(2);
      } else {
        setCantidadVisible(3);
      }
    };

    actualizarCantidad();
    window.addEventListener('resize', actualizarCantidad);
    return () => window.removeEventListener('resize', actualizarCantidad);
  }, []);

  if (total === 0) {
    return <div className="text-center py-5">Cargando productos...</div>;
  }

  const mostrarSiguiente = () => {
    setInicio((inicio + 1) % total);
  };

  const mostrarAnterior = () => {
    setInicio((inicio - 1 + total) % total);
  };

  const productosVisibles = [];
  for (let i = 0; i < cantidadVisible; i++) {
    const index = (inicio + i) % total;
    productosVisibles.push(productos[index]);
  }

  return (
    <section className="py-5 carrucel-productos">
      <div className="container">
        <h2 className="text-center mb-4">Productos de la Farmacia</h2>

        <div className="carrucel-wrapper">
          <button className="btn btn-outline-primary flecha flecha-izquierda" onClick={mostrarAnterior}>
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="carrucel-items">
            {productosVisibles.map((producto) => (
              <TarjetaCarrucel key={producto.id} producto={producto} />
            ))}
          </div>

          <button className="btn btn-outline-primary flecha flecha-derecha" onClick={mostrarSiguiente}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="boton-volver text-center mt-4 mb-3">
          <Link to="/productos" className="btn-volver">
            Ver el catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
