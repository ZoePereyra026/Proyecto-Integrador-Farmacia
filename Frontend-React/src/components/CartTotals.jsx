import React from 'react';

export default function CartTotals({ subtotal, total, money, clearCart, handleCheckout }) {
  const confirmarVaciado = () => {
    if (window.confirm('¿Desea vaciar su carrito?')) {
      clearCart();
      window.dispatchEvent(new Event('carritoActualizado'));
    }
  };

  return (
    <section className="total">
      <div className="resumen-precios">
        <p><strong>Subtotal:</strong> <span>{money(subtotal)}</span></p>
        <h2><strong>Total:</strong> <span>{money(total)}</span></h2>
      </div>

      <div className="acciones">
        <div className="boton-wrapper">
          <button id="btnClearCart" onClick={confirmarVaciado}>
            Vaciar carrito
          </button>
        </div>
        <div className="boton-wrapper">
          <button className="boton-pago" onClick={handleCheckout}>
            Proceder al Pago
          </button>
        </div>
      </div>
    </section>
  );
}
