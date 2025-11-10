export default function Filtros({ categoriaSeleccionada, setCategoriaSeleccionada }) {
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
    </div>
  );
}
