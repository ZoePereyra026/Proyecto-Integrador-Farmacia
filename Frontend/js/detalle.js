function obtenerParametroGET(nombreParametro) {
  const params = new URLSearchParams(window.location.search);
  const valor = params.get(nombreParametro);
  return valor ? valor.trim() : null;
}

// Carrito
function getCart() {
  try { return JSON.parse(localStorage.getItem("cart")) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function addToCart(producto, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === producto.id);
  if (idx >= 0) {
    cart[idx].qty += qty;
  } else {
    cart.push({ ...producto, qty });
  }
  saveCart(cart);
}

// Actualiza el contador visual del carrito
function actualizarContadorCarrito() {
  const cart = getCart();
  const totalItems = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
  const contador = document.getElementById("contadorCarrito");
  if (contador) contador.textContent = totalItems;
}

let productos = [];

const cargarDatos = async () => {
  try {
    const respuesta = await fetch('../backend/data/producto.json');
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
  const titulo = document.querySelector('.nombre-producto');
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

  const cantidadBox = document.querySelector('.cantidad-elegante');
  const valorCantidad = cantidadBox?.querySelector('.valor-cantidad');
  const btnMas = cantidadBox?.querySelector('.btn-cantidad.plus');
  const btnMenos = cantidadBox?.querySelector('.btn-cantidad.minus');
  const btnAgregar = document.querySelector('.agregar-carrito');

  if (valorCantidad && !/^\d+$/.test(valorCantidad.textContent.trim())) {
    valorCantidad.textContent = "1";
  }

  btnMas?.addEventListener('click', () => {
    const actual = parseInt(valorCantidad.textContent, 10) || 1;
    if (actual < 99) valorCantidad.textContent = String(actual + 1);
  });

  btnMenos?.addEventListener('click', () => {
    const actual = parseInt(valorCantidad.textContent, 10) || 1;
    if (actual > 1) valorCantidad.textContent = String(actual - 1);
  });

  btnAgregar?.addEventListener('click', () => {
    const qty = Math.max(1, parseInt(valorCantidad?.textContent || "1", 10) || 1);
    const item = {
      id: producto.id,
      name: producto.nombre,
      price: Number(producto.precio),
      image: producto.imagenUrl
    };
    addToCart(item, qty);
    actualizarContadorCarrito(); 
    alert("Producto agregado al carrito");
  });
};

const mostrarMensajeError = (mensaje) => {
  const contenedor = document.querySelector('.detalle-container');
  if (contenedor) {
    contenedor.innerHTML = `
      <div class="mensaje-error">
        <h2 class="text-danger">${mensaje}</h2>
        <p>Verificá el ID o volvé al <a href="index.html">inicio</a>.</p>
      </div>
    `;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('Iniciando carga de producto...');
  cargarDatos();
  actualizarContadorCarrito(); 
});
