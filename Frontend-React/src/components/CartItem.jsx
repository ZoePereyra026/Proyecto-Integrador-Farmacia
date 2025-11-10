import React from 'react';

export default function CartItem({ item, setQty, removeFromCart, money }) {
  const handleRemove = () => {
    if (window.confirm('¿Desea eliminar el producto del carrito?')) {
      removeFromCart(item.id);

      const nuevoCarrito = JSON.parse(localStorage.getItem('cart')) || [];
      window.dispatchEvent(new Event('carritoActualizado'));

      if (nuevoCarrito.length === 0) {
        window.location.reload();
      }
    }
  };

  return (
    <div className="producto">
      <img src={item.image || item.imagenUrl} alt={item.name || item.nombre} />
      <div className="info">
        <h3>{item.name || item.nombre}</h3>
        <p className="precio-unitario">
          <strong>Precio:</strong> {money(item.price || item.precio)}
        </p>

        <div className="bloque-cantidad">
          <span className="etiqueta-cantidad"><strong>Cantidad:</strong></span>
          <div className="cantidad-elegante">
            <button className="btn-cantidad minus" onClick={() => setQty(item.id, item.qty - 1)}>−</button>
            <span className="valor-cantidad">{item.qty}</span>
            <button className="btn-cantidad plus" onClick={() => setQty(item.id, item.qty + 1)}>+</button>
          </div>
        </div>

        <p className="precio-total">
          <strong>Total:</strong> {money((item.precio || item.price) * item.qty)}
        </p>

        <button className="remove" onClick={handleRemove}>
          Eliminar
        </button>
      </div>
    </div>
  );
}
