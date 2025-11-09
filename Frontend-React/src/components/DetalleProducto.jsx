import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProductos from '../hooks/useProductos';
import '../css/style_producto.css';

export default function DetalleProducto() {
  const { id } = useParams();
  const productos = useProductos() || [];
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (productos.length > 0) {
      const encontrado = productos.find(p => String(p.id) === String(id));
      setProducto(encontrado || null);
    }
  }, [productos, id]);

  const incrementar = () => setCantidad(prev => prev + 1);
  const decrementar = () => setCantidad(prev => Math.max(1, prev - 1));

  const agregarAlCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem('cart')) || [];
    const existente = carrito.find(item => item.id === producto.id);

    if (existente) {
      existente.qty += cantidad;
    } else {
      carrito.push({ ...producto, qty: cantidad });
    }

    localStorage.setItem('cart', JSON.stringify(carrito));
    alert('Producto agregado al carrito');

    // 🔄 Recargar la página para actualizar el contador
    window.location.reload();
  };

  if (!producto) {
    return <div className="text-center py-5">Cargando producto...</div>;
  }

  return (
    <main className="my-0 px-3 px-md-5">
      <div className="detalle-container">
        {/* Galería */}
        <div className="galeria">
          <img
            className="imagen-principal"
            src={producto.imagenUrl}
            alt={producto.nombre}
          />
          <div className="boton-volver text-center mt-4">
            <Link to="/productos" className="btn-volver">Ver el catálogo</Link>
          </div>
          <div className="miniaturas"></div>
        </div>

        {/* Información */}
        <div className="info-producto">
          <h1 className="nombre-producto">{producto.nombre}</h1>
          <p className="precio text-success fw-bold">${producto.precio}</p>
          <p className="descripcion">{producto.descripcion}</p>

          <div className="fila-cantidad">
            <span className="etiqueta-cantidad"><strong>Cantidad:</strong></span>
            <div className="cantidad-elegante">
              <button className="btn-cantidad minus" onClick={decrementar}>−</button>
              <span className="valor-cantidad">{cantidad}</span>
              <button className="btn-cantidad plus" onClick={incrementar}>+</button>
            </div>
          </div>

          <div className="contenedor-boton">
            <button className="agregar-carrito btn btn-success" onClick={agregarAlCarrito}>
              <strong>Agregar al Carrito</strong>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
