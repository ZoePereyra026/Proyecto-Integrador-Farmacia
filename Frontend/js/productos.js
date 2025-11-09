let productos = [];
let productosFiltrados = [];
let cantidadVisible = 9;

// Cargar productos desde archivo JSON
const cargarProductos = async () => {
  try {
    const respuesta = await fetch('../backend/data/producto.json');
    if (!respuesta.ok) throw new Error('Archivo no encontrado');
    const datosRespuesta = await respuesta.json();
    productos = datosRespuesta;

    document.getElementById('cat0').checked = true;
    productosFiltrados = productos;
    cantidadVisible = 9;
    renderizarProductos();
    actualizarBotones(productosFiltrados.length);

    inicializarBuscador();
    inicializarFiltros();
  } catch (error) {
    console.error('Error al cargar productos:', error.message || error);
    document.getElementById('listado-productos').innerHTML = `
      <p class="text-danger">Error al cargar productos.</p>
    `;
  }
};

const renderizarProductos = () => {
  const contenedor = document.getElementById('listado-productos');
  contenedor.innerHTML = '';

  const productosAMostrar = productosFiltrados.slice(0, cantidadVisible);

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
          <a href="producto.html?id=${producto.id}" class="btn btn-outline-primary btn-sm card-img-top img-producto" class="card-img-top img-producto" >Ver más detalles</a>
        </div>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  });
};

const actualizarBotones = (cantidad = productosFiltrados.length) => {
  document.getElementById('verMas').disabled = cantidadVisible >= cantidad;
  document.getElementById('verMenos').disabled = cantidadVisible <= 9;
};

document.getElementById('verMas').addEventListener('click', () => {
  cantidadVisible += 9;
  renderizarProductos();
  actualizarBotones(productosFiltrados.length);
});

document.getElementById('verMenos').addEventListener('click', () => {
  cantidadVisible = Math.max(9, cantidadVisible - 9);
  renderizarProductos();
  actualizarBotones(productosFiltrados.length);
});

const aplicarFiltros = () => {
  const inputBusqueda = document.querySelector("input[name='q']");
  const termino = inputBusqueda.value.toLowerCase();
  const categoriaSeleccionada = document.querySelector("input[name='categoria']:checked")?.value;

  let filtrados = categoriaSeleccionada === "Todos los productos"
    ? productos
    : productos.filter(p => p.categoria?.includes(categoriaSeleccionada));

  if (termino) {
    filtrados = filtrados.filter(p =>
      p.nombre.toLowerCase().includes(termino)
    );
  }

  productosFiltrados = filtrados;
  cantidadVisible = 9;
  renderizarProductos();
  actualizarBotones(productosFiltrados.length);
};

const inicializarFiltros = () => {
  const radiosCategoria = document.querySelectorAll("input[name='categoria']");
  radiosCategoria.forEach(radio => {
    radio.addEventListener('change', aplicarFiltros);
  });
};

const inicializarBuscador = () => {
  const formulario = document.querySelector("form[role='search']");
  const inputBusqueda = formulario.querySelector("input[name='q']");

  formulario.addEventListener("submit", e => {
    e.preventDefault();
    aplicarFiltros();
  });

  inputBusqueda.addEventListener("input", aplicarFiltros); 
};

const actualizarContadorCarrito = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
  const contador = document.getElementById("contadorCarrito");
  if (contador) contador.textContent = totalItems;
};

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  console.log('Inicio de carga de productos');
  cargarProductos();
  actualizarContadorCarrito();
});
