import { useState } from 'react';

export default function useCart() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const getCart = () => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  };

  const saveCart = (c) => {
    localStorage.setItem('cart', JSON.stringify(c));
    setCart(c);
    updateTotals(c);
  };

  const updateTotals = (c) => {
    const sub = c.reduce((acc, it) => {
        const precio = Number(it.precio || it.price) || 0;
        const cantidad = Number(it.qty) || 1;
        return acc + precio * cantidad;
    }, 0);
    setSubtotal(sub);
    setTotal(sub);
  };


  const setQty = (id, qty) => {
    const updated = cart.map((item) =>
      String(item.id) === String(id)
        ? { ...item, qty: Math.max(1, parseInt(qty, 10) || 1) }
        : item
    );
    saveCart(updated);
  };

  const removeFromCart = (id) => {
    const filtered = cart.filter((item) => String(item.id) !== String(id));
    saveCart(filtered);
  };

  const clearCart = () => saveCart([]);

  const money = (n) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(n ?? 0);

  return {
    cart,
    subtotal,
    total,
    setCart,
    getCart,
    saveCart,
    setQty,
    removeFromCart,
    clearCart,
    updateTotals,
    money,
  };
}
