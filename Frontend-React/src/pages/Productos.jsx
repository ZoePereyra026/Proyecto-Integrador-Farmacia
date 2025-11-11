import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import Filtros from '../components/Filtros';
import ListadoProductos from '../components/ListadoProductos';
import useProductos from '../hooks/useProductos';
import '../css/style_productos.css';

export default function Productos() {
  const todosLosProductos = useProductos();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos los productos");
  const [cantidadVisible, setCantidadVisible] = useState(9);
  const [busqueda, setBusqueda] = useState("");
  const [precioMinimo, setPrecioMinimo] = useState("0");
  const [precioMaximo, setPrecioMaximo] = useState("600");

  const productosFiltrados = todosLosProductos.filter(p => {
    const coincideCategoria =
      categoriaSeleccionada === "Todos los productos"
        ? true
        : Array.isArray(p.categoria) &&
          p.categoria.some(cat => cat.trim().toLowerCase() === categoriaSeleccionada.trim().toLowerCase());

    const coincideBusqueda =
      busqueda.trim() === "" ||
      p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase());

    const coincidePrecio =
      (precioMinimo === "" || p.precio >= parseFloat(precioMinimo)) &&
      (precioMaximo === "" || p.precio <= parseFloat(precioMaximo));

    return coincideCategoria && coincideBusqueda && coincidePrecio;
  });

  const productosMostrados = productosFiltrados.slice(0, cantidadVisible);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar busqueda={busqueda} setBusqueda={setBusqueda} />

      <main className="flex-grow-1">
        <div className="container my-5">
          <div className="layout-productos d-flex" style={{ gap: '20px' }}>
            <aside style={{ flex: '0 0 250px' }}>
              <Filtros
                categoriaSeleccionada={categoriaSeleccionada}
                setCategoriaSeleccionada={(cat) => {
                  setCategoriaSeleccionada(cat);
                  setCantidadVisible(9);
                }}
                precioMinimo={precioMinimo}
                setPrecioMinimo={setPrecioMinimo}
                precioMaximo={precioMaximo}
                setPrecioMaximo={setPrecioMaximo}
              />
            </aside>

            <section style={{ flex: '1 1 auto' }}>
              <ListadoProductos productos={productosMostrados} />

              <div className="text-center mt-4">
                {cantidadVisible < productosFiltrados.length && (
                  <button
                    className="btn btn-success me-2"
                    onClick={() => setCantidadVisible(cantidadVisible + 9)}
                  >
                    Ver más
                  </button>
                )}
                {cantidadVisible > 9 && (
                  <button
                    className="btn btn-secondary"
                    onClick={() => setCantidadVisible(Math.max(9, cantidadVisible - 9))}
                  >
                    Ver menos
                  </button>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
