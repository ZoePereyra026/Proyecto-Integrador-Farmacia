const { connCarrito } = require("../config/database");
const mongoose = require("mongoose");

const carritoSchema = new mongoose.Schema({
  idCarrito: {
    type: Number,
    required: true,
    unique: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true
      },
      cantidad: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  actualizadoEn: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ["pendiente", "comprado"],
    default: "pendiente"
  },
  subtotal: {
    type: Number,
    default: 0
  },
  descuentoAplicado: {
    type: Number,
    default: 0
  },
  totalFinal: {
    type: Number,
    default: 0
  },
  fechaCompra: {
    type: Date
  }
});

const Carrito = connCarrito.model("Carrito", carritoSchema, "carritos");

module.exports = Carrito;
