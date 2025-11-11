import { useNavigate } from 'react-router-dom';

export default function ProductoCard({ producto }) {
  const navigate = useNavigate();

  const irADetalle = () => {
    navigate(`/producto/${producto.id}`);
  };

  return (
    <div className="col-md-4">
      <div className="card h-100">
        <img src={producto.imagenUrl} className="card-img-top" alt={producto.nombre} />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title">{producto.nombre}</h5>
            <p className="card-text">${producto.precio}</p>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-success btn-detalle mt-3" onClick={irADetalle}>
              Ver más detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
