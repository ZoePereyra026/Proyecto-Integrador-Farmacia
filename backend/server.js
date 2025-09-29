const express = require("express");
require("dotenv").config();

const {
  connUsuario,
  connProducto,
  connCategoria,
  connCarrito
} = require("./config/database");

const userRoutes = require("./routes/userRoutes");
const productoRoutes = require("./routes/productoRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const carritoRoutes = require("./routes/carritoRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parseo JSON
app.use(express.json());

// Conexión a todas las base de datos
connUsuario.once("open", () => console.log("Conectado a base de datos: Usuario"));
connProducto.once("open", () => console.log("Conectado a base de datos: Producto"));
connCategoria.once("open", () => console.log("Conectado a base de datos: Categoria"));
connCarrito.once("open", () => console.log("Conectado a base de datos: Carrito"));

// Ruta pública
app.get("/", (req, res) =>
  res.json({ message: "Bienvenidos a la API REST de eCommerce - Farmacia San Martín!" })
);

// Todas las rutas (sin verificarToken)
app.use("/api/auth", userRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/carritos", carritoRoutes);
app.use("/api/usuarios", userRoutes);

// Manejo de errores 404
app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

// Iniciar el servidor en el puerto 3000
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
