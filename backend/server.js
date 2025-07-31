const express = require("express");
require("dotenv").config();

const { connUsuario, connProducto, connCategoria } = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const productoRoutes = require("./routes/productoRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes"); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parseo JSON
app.use(express.json());

// Conexión a las base de datos (Usuario, Producto, Categoria)
connUsuario.once("open", () => {
  console.log("Conectado a base de datos: Usuario");
});
connProducto.once("open", () => {
  console.log("Conectado a base de datos: Producto");
});
connCategoria.once("open", () => {
  console.log("Conectado a base de datos: Categoria");
});

// Ruta principal
app.get("/", (req, res) =>
  res.json({ message: "Bienvenidos a la API REST de eCommerce - Farmacia San Martín!" })
);

// Rutas
app.use("/api/usuarios", userRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/categorias", categoriaRoutes); 

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
