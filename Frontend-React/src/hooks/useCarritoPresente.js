import { useState, useEffect } from 'react';

export default function useCarritoPresente() {
  const [hayCarrito, setHayCarrito] = useState(false);

  useEffect(() => {
    const verificar = () => {
      const carrito = JSON.parse(localStorage.getItem('cart')) || [];
      setHayCarrito(Array.isArray(carrito) && carrito.length > 0);
    };

    verificar();
    window.addEventListener('carritoActualizado', verificar);
    return () => window.removeEventListener('carritoActualizado', verificar);
  }, []);

  return hayCarrito;
}
