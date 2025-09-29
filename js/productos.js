let productos = [];
let cantidadVisible = 9; // solo mostrar esta cantidad inicialmente

// Cargar productos desde archivo JSON
const cargarProductos = async () => {
  try {
    const respuesta = await fetch('./backend/data/producto.json');
    if (!respuesta.ok) throw new Error('Archivo no encontrado');
    const datosRespuesta = await respuesta.json();
    productos = datosRespuesta;
    mostrarProductos();
    actualizarBotones();
  } catch (error) {
    console.error('Error al cargar productos:', error.message || error);
    document.getElementById('listado-productos').innerHTML = `
      <p class="text-danger">Error al cargar productos.</p>
    `;
  }
};

const mostrarProductos = () => {
  const contenedor = document.getElementById('listado-productos');
  contenedor.innerHTML = '';

  const productosAMostrar = productos.slice(0, cantidadVisible);

  productosAMostrar.forEach(producto => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'col-md-4';

    const imagenSrc = producto.imagenUrl || producto.imagen_url || 'img/placeholder.jpg';

    tarjeta.innerHTML = `
      <div class="card h-100">
        <img src="${imagenSrc}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body text-center">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="text-success fw-bold">$${producto.precio}</p>
          <a href="producto.html?id=${producto.id}" class="btn btn-outline-primary btn-sm">Ver más detalles</a>
        </div>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  });
};

// Visibilidad de botones
const actualizarBotones = () => {
  document.getElementById('verMas').disabled = cantidadVisible >= productos.length;
  document.getElementById('verMenos').disabled = cantidadVisible <= 10;
};

document.getElementById('verMas').addEventListener('click', () => {
  cantidadVisible += 10;
  mostrarProductos();
  actualizarBotones();
});

document.getElementById('verMenos').addEventListener('click', () => {
  cantidadVisible = Math.max(10, cantidadVisible - 10);
  mostrarProductos();
  actualizarBotones();
});

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  console.log('Inicio de carga de productos');
  cargarProductos();
});
