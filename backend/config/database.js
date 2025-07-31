const mongoose = require("mongoose");
require("dotenv").config();

const {
  DB_PROTOCOL,
  DB_HOST,
  DB_PASS,
  DB_USER,
  DB_OPTIONS,
  DB_NAME,    // BD (Usuario)
  DB_NAME_2,  // BD (Producto)
  DB_NAME_3,  // BD (Categoria)
  DB_NAME_4   // BD (Carrito)
} = process.env;

// URI para DB de usuarios
const URI_Usuario = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?${DB_OPTIONS}`;

// URI para DB de productos
const URI_Producto = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME_2}?${DB_OPTIONS}`;

// URI para DB de Categorias
const URI_Categoria = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME_3}?${DB_OPTIONS}`;

// URI para DB de Carritos
const URI_Carrito = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME_4}?${DB_OPTIONS}`;

// Conexiones separadas
const connUsuario = mongoose.createConnection(URI_Usuario);
const connProducto = mongoose.createConnection(URI_Producto);
const connCategoria = mongoose.createConnection(URI_Categoria);
const connCarrito = mongoose.createConnection(URI_Carrito);

module.exports = {
  connUsuario,
  connProducto,
  connCategoria,
  connCarrito
};
