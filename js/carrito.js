import { apiPost } from "./api.js";

function getCart() {
  try { return JSON.parse(localStorage.getItem("cart")) || []; }
  catch { return []; }
}
function saveCart(c) { localStorage.setItem("cart", JSON.stringify(c)); }
function setQty(id, qty) {
  const c = getCart();
  const it = c.find(i => String(i.id) === String(id));
  if (!it) return c;
  it.qty = Math.max(1, parseInt(qty, 10) || 1);
  saveCart(c);
  return c;
}
function removeFromCart(id) {
  const c = getCart().filter(i => String(i.id) !== String(id));
  saveCart(c);
  return c;
}
function clearCart() { saveCart([]); }

function rowSubtotal(it) { return (Number(it.price) || 0) * (Number(it.qty) || 0); }
function totals(c) {
  const subtotal = c.reduce((acc, it) => acc + rowSubtotal(it), 0);
  return { subtotal, total: subtotal };
}
function money(n) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" })
    .format(n ?? 0);
}

function mostrarBotonCatalogoEnHeader() {
  const cart = getCart();
  const contenedor = document.getElementById("botonCatalogoHeader");
  if (contenedor) {
    contenedor.innerHTML = cart.length > 0
      ? `<a href="productos.html" class="btn-volver">Volver al catálogo</a>`
      : "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const listEl     = document.querySelector("#cartList");
  const subtotalEl = document.querySelector("#cartSubtotal");
  const totalEl    = document.querySelector("#cartTotal");
  const clearBtn   = document.querySelector("#btnClearCart");
  const checkoutBtn= document.querySelector("#btnCheckout");

  function actualizarContadorCarrito() {
    const cart = getCart();
    const totalItems = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
    const contador = document.getElementById("contadorCarrito");
    if (contador) contador.textContent = totalItems;
  }

  function render() {
    const cart = getCart();
    listEl.innerHTML = "";
    mostrarBotonCatalogoEnHeader();

    if (!cart.length) {
      listEl.innerHTML = `
        <div class="carrito-vacio text-center">
          <img src="./img/carrito_vacio.png" alt="Carrito vacío" width="100" height="100" />
          <i class="fas fa-shopping-cart icono-vacio"></i>
          <h3>Tu carrito está vacío</h3>
          <p>Agregá productos para comenzar tu compra.</p>
          <a href="productos.html" id="btn_medio">Volver al catálogo</a>
        </div>
      `;
      subtotalEl.textContent = money(0);
      totalEl.textContent = money(0);
      return;
    }

    cart.forEach(it => {
      const node = document.createElement("div");
      node.className = "producto";
      node.innerHTML = `
        <img src="${it.image}" alt="${it.name}">
        <div class="info">
          <h3>${it.name}</h3>
          <p class="precio-unitario"><strong>Precio:</strong> ${money(it.price)}</p>
          <div class="bloque-cantidad">
            <span class="etiqueta-cantidad"><strong>Cantidad:</strong></span>
            <div class="cantidad-elegante">
              <button class="btn-cantidad minus" data-id="${it.id}">−</button>
              <span class="valor-cantidad">${it.qty}</span>
              <button class="btn-cantidad plus" data-id="${it.id}">+</button>
            </div>
          </div>
          <p class="precio-total"><strong>Total:</strong> ${money(rowSubtotal(it))}</p>
          <button class="remove" data-id="${it.id}">Eliminar</button>
        </div>`;
      listEl.appendChild(node);
    });

    const t = totals(cart);
    subtotalEl.textContent = money(t.subtotal);
    totalEl.textContent = money(t.total);

    listEl.querySelectorAll(".btn-cantidad.plus").forEach(b => b.addEventListener("click", e => {
      const id = e.currentTarget.dataset.id;
      const it = getCart().find(x => String(x.id) === String(id));
      setQty(id, (it?.qty || 1) + 1);
      render();
    }));

    listEl.querySelectorAll(".btn-cantidad.minus").forEach(b => b.addEventListener("click", e => {
      const id = e.currentTarget.dataset.id;
      const it = getCart().find(x => String(x.id) === String(id));
      setQty(id, Math.max(1, (it?.qty || 1) - 1));
      render();
    }));

    listEl.querySelectorAll(".remove").forEach(b => b.addEventListener("click", e => {
      const id = e.currentTarget.dataset.id;
      const confirmar = confirm("¿Desea eliminar el producto del carrito?");
      if (confirmar) {
        removeFromCart(id);
        render();
        alert("Producto eliminado");
      }
    }));
  }

  clearBtn?.addEventListener("click", () => {
    const confirmar = confirm("¿Desea vaciar su carrito?");
    if (confirmar) {
      clearCart();
      render();
      alert("Carrito vaciado");
    }
  });

  checkoutBtn?.addEventListener("click", async () => {
    const cart = getCart();
    if (!cart.length) return;

    const payload = {
      usuarioId: localStorage.getItem("user_id"), 
      items: cart.map(i => ({
        productId: i.id,       
        quantity: i.qty,
        unitPrice: i.price
      }))
    };

    try {
      const order = await apiPost("/carritos", payload);
      clearCart();
      render();
      alert(`¡Pedido generado! Nº ${order.id || order._id || "(sin número)"}`);
    } catch (err) {
      console.error(err);
      alert("Error al generar pedido");
    }
  });

  actualizarContadorCarrito();
  render();
});
