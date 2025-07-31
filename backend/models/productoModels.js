const { connProducto } = require("../config/database"); 
const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  categoria: { 
    type: [String], 
    required: true 
  },
  fabricante: {
    type: String,
    required: true
  },
  imagenUrl: {
    type: String,
    default: ""
  }
});

const Producto = connProducto.model("Producto", productoSchema, "productos");

module.exports = Producto;
