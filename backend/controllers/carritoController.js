const mongoose = require("mongoose");
const Carrito = require("../models/carritoModels");

// Utilidad: validar ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET /api/carritos  -> listar todos (con populate)
const obtenerCarritos = async (req, res) => {
  try {
    const carritos = await Carrito.find()
      .populate("usuario", "username email role")
      .populate("productos.producto", "nombre precio fabricante categoria");
    res.json(carritos);
  } catch (error) {
    console.error("[obtenerCarritos]", error);
    res.status(500).json({ error: "Error al obtener carritos" });
  }
};

// POST /api/carritos -> crear carrito/pedido nuevo
// Body esperado:
// {
//   "usuarioId": "66f47f2b9f0a7a1234567890",
//   "items": [
//     { "productId": "66f480ea9f0a7a1234567899", "quantity": 2, "unitPrice": 500 },
//     ...
//   ]
// }
const crearCarrito = async (req, res) => {
  try {
    const { usuarioId, items } = req.body;

    // Validaciones básicas
    if (!usuarioId) {
      return res.status(400).json({ error: "usuarioId es requerido" });
    }
    if (!isValidObjectId(usuarioId)) {
      return res.status(400).json({ error: "usuarioId no es un ObjectId válido" });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "items debe ser un arreglo con al menos un producto" });
    }

    // Validar cada item
    for (const it of items) {
      if (!it.productId || !isValidObjectId(it.productId)) {
        return res.status(400).json({ error: "productId inválido en items" });
      }
      if (!Number.isFinite(it.quantity) || it.quantity < 1) {
        return res.status(400).json({ error: "quantity debe ser número >= 1" });
      }
      if (!Number.isFinite(it.unitPrice) || it.unitPrice < 0) {
        return res.status(400).json({ error: "unitPrice debe ser número >= 0" });
      }
    }

    // Calcular totales
    const subtotal = items.reduce(
      (acc, it) => acc + Number(it.unitPrice) * Number(it.quantity),
      0
    );
    const descuentoAplicado = 0;
    const totalFinal = Math.max(0, subtotal - descuentoAplicado);

    // Armar documento
    const nuevoCarrito = new Carrito({
      idCarrito: Date.now(), // identificador numérico único simple
      usuario: usuarioId,
      productos: items.map((it) => ({
        producto: it.productId,
        cantidad: it.quantity,
      })),
      actualizadoEn: new Date(),
      estado: "pendiente",
      subtotal,
      descuentoAplicado,
      totalFinal,
      // fechaCompra: se completa al marcar "comprado"
    });

    const carritoGuardado = await nuevoCarrito.save();

    // Devolver con populate para comodidad del front
    const carritoPopulado = await Carrito.findById(carritoGuardado._id)
      .populate("usuario", "username email role")
      .populate("productos.producto", "nombre precio fabricante categoria");

    return res.status(201).json(carritoPopulado);
  } catch (error) {
    console.error("[crearCarrito]", error);
    return res.status(500).json({ error: "Error al crear carrito/pedido" });
  }
};

module.exports = {
  obtenerCarritos,
  crearCarrito,
};
