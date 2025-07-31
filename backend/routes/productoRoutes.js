const { Router } = require("express");
const productoController = require("../controllers/productoController");

const router = Router();

// Buscar productos por categoría
router.get("/buscar", productoController.obtenerProductosPorCategoria); // Si funciona

// Crear producto
router.post("/", productoController.crearProducto); // Si funciona

// Obtener todos los productos
router.get("/", productoController.obtenerProductos); // Si funciona

// Obtener producto por ID
router.get("/:id", productoController.obtenerProductoPorId); // Si funciona

// Actualizar producto
router.put("/:id", productoController.actualizarProducto); // Si funciona

// Eliminar producto
router.delete("/:id", productoController.eliminarProducto); // Si funciona

// Buscar productos por fabricante
router.get("/filtrar/fabricante", productoController.obtenerProductosPorFabricante); // Si funciona 

// Buscar productos por rango de precio
router.get("/filtrar/precio", productoController.obtenerProductosPorRangoPrecio); // Si funciona

// Actualizar solo el stock de un producto por su ID
router.put("/stock/:id", productoController.actualizarStockProducto);

module.exports = router;
