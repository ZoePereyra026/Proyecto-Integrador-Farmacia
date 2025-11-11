import ProductoCard from './ProductoCard';
import '../../css/style_productos.css';

export default function ListadoProductos({ productos }) {
  return (
    <div id="listado-productos">
      {productos.map((prod) => (
        <ProductoCard key={prod.id} producto={prod} />
      ))}
    </div>
  );
}
