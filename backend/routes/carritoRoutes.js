// routes/carritoRoutes.js
const express = require("express");
const router = express.Router();

// Importá los controladores que implementan la lógica
const {
  obtenerCarritos,
  crearCarrito,
} = require("../controllers/carritoController");

// GET /api/carritos  -> listar todos los carritos/pedidos
router.get("/", obtenerCarritos);

// POST /api/carritos -> crear un carrito/pedido nuevo
// Body esperado (ejemplo):
// {
//   "items": [
//     { "productId": "123", "quantity": 2, "unitPrice": 500 }
//   ],
//   "customer": { "name": "Invitado" }
// }
router.post("/", crearCarrito);

module.exports = router;
