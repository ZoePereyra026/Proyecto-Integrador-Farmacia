const { connCategoria } = require("../config/database"); 
const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  estado: {
    type: Boolean,
    default: true 
  },
  destacada: {
    type: Boolean,
    default: false
  },
  descripcion: {
    type: String,
    default: ""
  }
});

const Categoria = connCategoria.model("Categoria", categoriaSchema, "categorias");

module.exports = Categoria;
