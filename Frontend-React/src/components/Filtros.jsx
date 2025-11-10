export default function Filtros({
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  precioMinimo,
  setPrecioMinimo,
  precioMaximo,
  setPrecioMaximo
}) {
  const categorias = [
    "Todos los productos",
    "Medicamentos",
    "Suplementos",
    "Cuidado Personal",
    "Respiratorio",
    "Higiene",
    "Pediatría"
  ];

  return (
    <div className="filtros mb-4">
      <h5 className="mb-3">Categorías</h5>
      {categorias.map((cat, index) => (
        <div className="form-check" key={index}>
          <input
            className="form-check-input"
            type="radio"
            name="categoria"
            id={`cat${index}`}
            value={cat}
            checked={categoriaSeleccionada === cat}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          />
          <label className="form-check-label" htmlFor={`cat${index}`}>
            {cat}
          </label>
        </div>
      ))}

      <hr />

      <h5 className="mb-3">Filtrar por precio</h5>
      <div className="mb-2">
        <label htmlFor="precioMinimo" className="form-label">Precio mínimo</label>
        <input
          type="number"
          className="form-control"
          id="precioMinimo"
          value={precioMinimo}
          onChange={(e) => setPrecioMinimo(e.target.value)}
          min="0"          
          max="600"
          step="1"         
        />
      </div>
      <div>
        <label htmlFor="precioMaximo" className="form-label">Precio máximo</label>
        <input
          type="number"
          className="form-control"
          id="precioMaximo"
          value={precioMaximo}
          onChange={(e) => setPrecioMaximo(e.target.value)}
          min="0"
          max="10000"
          step="1"
        />
      </div>
    </div>
  );
}
