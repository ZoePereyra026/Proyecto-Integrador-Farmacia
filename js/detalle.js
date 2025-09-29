// Obtener parámetro GET desde la URL
function obtenerParametroGET(nombreParametro) {
    const params = new URLSearchParams(window.location.search);
    const valor = params.get(nombreParametro);
    return valor ? valor.trim() : null;
}

let productos = [];

const cargarDatos = async () => {
    try {
        const respuesta = await fetch('./backend/data/producto.json');
        if (!respuesta.ok) throw new Error('Archivo no encontrado');

        const datos = await respuesta.json();
        productos = Array.isArray(datos) ? datos : [];

        const id = parseInt(obtenerParametroGET('id'), 10);
        if (isNaN(id)) {
        console.warn('ID inválido en la URL');
        mostrarMensajeError('ID inválido.');
        return;
        }

        const productoEncontrado = productos.find(p => p.id === id);
        
        if (productoEncontrado) {
        console.log('Producto encontrado:', productoEncontrado);
        mostrarInfoProducto(productoEncontrado);
        } else {
        console.warn('Producto no encontrado con ID:', id);
        mostrarMensajeError('Producto no disponible.');
        }
    } catch (error) {
        console.error('Error al cargar datos:', error.message || error);
        mostrarMensajeError('Error al cargar producto.');
    }
};

const mostrarInfoProducto = (producto) => {
    const imagenPrincipal = document.querySelector('.imagen-principal');
    const titulo = document.querySelector('.info-producto h1');
    const precio = document.querySelector('.precio');
    const descripcion = document.querySelector('.descripcion');
    const infoProducto = document.querySelector('.info-producto');
    const miniaturas = document.querySelector('.miniaturas');
    const filaCantidad = document.querySelector('.fila-cantidad');

    imagenPrincipal.src = producto.imagenUrl;
    imagenPrincipal.alt = producto.nombre;
    titulo.textContent = producto.nombre;
    precio.textContent = `$${producto.precio}`;
    descripcion.textContent = producto.descripcion;

    const categoriasTexto = Array.isArray(producto.categoria)
    ? producto.categoria.join(', ')
    : producto.categoria;

    const categoriaElemento = document.createElement('p');
    categoriaElemento.innerHTML = `<strong>Categoría:</strong> ${categoriasTexto}`;
    infoProducto.insertBefore(categoriaElemento, filaCantidad);


    const laboratorioElemento = document.createElement('p');
    laboratorioElemento.innerHTML = `<strong>Laboratorio:</strong> ${producto.fabricante}`;
    infoProducto.insertBefore(laboratorioElemento, filaCantidad);

    if (miniaturas) miniaturas.innerHTML = '';
};

const mostrarMensajeError = (mensaje) => {
  const contenedor = document.querySelector('.detalle-container');
  if (contenedor) {
    contenedor.innerHTML = `<p class="text-danger">${mensaje}</p>`;
  }
};

// Cargar pagina inicial de detalles del producto seleccionado
document.addEventListener('DOMContentLoaded', () => {
  console.log('Iniciando carga de producto...');
  cargarDatos();
});
