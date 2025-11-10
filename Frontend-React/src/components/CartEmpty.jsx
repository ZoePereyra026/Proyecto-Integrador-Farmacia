import React from 'react';
import BotonVerCatalogo from '../components/BotonVerCatalogo';

export default function CartEmpty() {
  return (
    <div className="carrito-vacio text-center">
      <img src="/img/carrito_vacio.png" alt="Carrito vacío" width="100" height="100" />
      <h3>Tu carrito está vacío</h3>
      <p>Agregá productos para comenzar tu compra.</p>
      <BotonVerCatalogo />
    </div>
  );
}

