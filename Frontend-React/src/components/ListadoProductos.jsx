import ProductoCard from './ProductoCard';

export default function ListadoProductos({ productos }) {
  return (
    <div id="listado-productos" className="row g-4">
      {productos.map((prod) => (
        <ProductoCard key={prod.id} producto={prod} />
      ))}
    </div>
  );
}
