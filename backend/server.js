const express = require("express");
require("dotenv").config();


const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
connectDB();

// Middleware
app.use(express.json());

// Ruta principal
app.get("/", (req, res) =>
  res.json({ message: "Bienvenidos a la API REST de eCommerce - Farmacia San Martín!" })
);

// Rutas de los usuarios
app.use("/api/usuarios", userRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(` Servidor inicializado en: http://localhost:${PORT}`);
});
