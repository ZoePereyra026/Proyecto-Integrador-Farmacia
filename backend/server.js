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

app.use(cors({
  origin: 'https://farmacia-frontend.onrender.com',
  credentials: true
}));

app.use(express.json());

connUsuario.once("open", () => console.log("Conectado a base de datos: Usuario"));
connProducto.once("open", () => console.log("Conectado a base de datos: Producto"));
connCategoria.once("open", () => console.log("Conectado a base de datos: Categoria"));
connCarrito.once("open", () => console.log("Conectado a base de datos: Carrito"));

app.get("/", (req, res) =>
  res.json({ message: "Bienvenidos a la API REST de eCommerce - Farmacia San Martín!" })
);

app.use("/api/usuarios", userRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/carritos", carritoRoutes);

app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
