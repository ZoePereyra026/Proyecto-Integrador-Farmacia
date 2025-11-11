import { useState, useEffect } from 'react';

export default function useProductos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('/producto.json')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(error => console.error("Error al cargar productos:", error));
  }, []);

  return productos;
}
