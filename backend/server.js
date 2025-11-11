const express = require("express");
const cors = require("cors"); 
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

app.use(cors()); 
app.use(express.json());

// Conexión a bases de datos
connUsuario.once("open", () => console.log("Conectado a base de datos: Usuario"));
connProducto.once("open", () => console.log("Conectado a base de datos: Producto"));
connCategoria.once("open", () => console.log("Conectado a base de datos: Categoria"));
connCarrito.once("open", () => console.log("Conectado a base de datos: Carrito"));

// Ruta principal
app.get("/", (req, res) =>
  res.json({ message: "Bienvenidos a la API REST de eCommerce - Farmacia San Martín!" })
);

// Rutas
app.use("/api/usuarios", userRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/carritos", carritoRoutes);

// Ruta no encontrada
app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
