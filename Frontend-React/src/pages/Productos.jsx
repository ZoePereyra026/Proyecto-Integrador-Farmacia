import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import Filtros from '../components/Filtros';
import ListadoProductos from '../components/ListadoProductos';
import useProductos from '../hooks/useProductos';

export default function Productos() {
  const todosLosProductos = useProductos();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos los productos");
  const [cantidadVisible, setCantidadVisible] = useState(6);
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = todosLosProductos.filter(p => {
    const coincideCategoria =
      categoriaSeleccionada === "Todos los productos"
        ? true
        : Array.isArray(p.categoria) &&
          p.categoria.some(cat => cat.trim().toLowerCase() === categoriaSeleccionada.trim().toLowerCase());

    const coincideBusqueda =
      busqueda.trim() === "" ||
      p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });

  const productosMostrados = productosFiltrados.slice(0, cantidadVisible);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar busqueda={busqueda} setBusqueda={setBusqueda} />

      <main className="flex-grow-1">
        <div className="container my-5">
          <div className="row">
            <aside className="col-md-3">
              <Filtros
                categoriaSeleccionada={categoriaSeleccionada}
                setCategoriaSeleccionada={(cat) => {
                  setCategoriaSeleccionada(cat);
                  setCantidadVisible(6);
                }}
              />
            </aside>

            <section className="col-md-9">
              {productosMostrados.length > 0 ? (
                <>
                  <ListadoProductos productos={productosMostrados} />
                  <div className="text-center mt-4">
                    {cantidadVisible < productosFiltrados.length && (
                      <button
                        className="btn btn-success me-2"
                        onClick={() => setCantidadVisible(cantidadVisible + 6)}
                      >
                        Ver más
                      </button>
                    )}
                    {cantidadVisible > 6 && (
                      <button
                        className="btn btn-secondary"
                        onClick={() => setCantidadVisible(6)}
                      >
                        Ver menos
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="alert alert-warning text-center">
                  No hay productos en la categoría seleccionada.
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
