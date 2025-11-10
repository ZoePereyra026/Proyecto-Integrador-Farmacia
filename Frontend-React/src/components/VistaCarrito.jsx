import React, { useEffect } from 'react';
import useCart from '../hooks/useCart';
import CartItem from '../components/CartItem';
import CartEmpty from '../components/CartEmpty';
import CartTotals from '../components/CartTotals';
import '../css/style_carrito.css'

export default function VistaCarrito() {
  const {
    cart,
    subtotal,
    total,
    setCart,
    getCart,
    setQty,
    removeFromCart,
    clearCart,
    updateTotals,
    money,
  } = useCart();

  useEffect(() => {
    const c = getCart();
    setCart(c);
    updateTotals(c);

    const sync = () => {
      const updated = getCart();
      setCart(updated);
      updateTotals(updated);
    };

    window.addEventListener('carritoActualizado', sync);
    return () => window.removeEventListener('carritoActualizado', sync);
  }, []);

  const handleCheckout = async () => {
    if (!cart.length) return;

    const payload = {
      usuarioId: localStorage.getItem('user_id'),
      items: cart.map((i) => ({
        productId: i.id,
        quantity: i.qty,
        unitPrice: i.price,
      })),
    };

    try {
      const response = await fetch('/carritos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const order = await response.json();
      clearCart();
      alert(`¡Pedido generado! Nº ${order.id || order._id || '(sin número)'}`);
    } catch (err) {
      console.error(err);
      alert('Error al generar pedido');
    }
  };

  return (
    <main className="carrito-container">
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <div id="cartList">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                setQty={setQty}
                removeFromCart={removeFromCart}
                money={money}
              />
            ))}
          </div>
          <CartTotals
            subtotal={subtotal}
            total={total}
            money={money}
            clearCart={clearCart}
            handleCheckout={handleCheckout}
          />
        </>
      )}
    </main>
  );
}
