const mongoose = require("mongoose");
require("dotenv").config();

const {
  DB_PROTOCOL,
  DB_HOST,
  DB_PASS,
  DB_USER,
  DB_OPTIONS,
  DB_NAME,     // BD (Usuario)
  DB_NAME_2    // BD (Producto)
} = process.env;

// URI para DB de usuarios
const URI_Usuario = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?${DB_OPTIONS}`;

// URI para DB de productos
const URI_Producto = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME_2}?${DB_OPTIONS}`;

// Conexiones separadas
const connUsuario = mongoose.createConnection(URI_Usuario);
const connProducto = mongoose.createConnection(URI_Producto);

module.exports = {
  connUsuario,
  connProducto
};
