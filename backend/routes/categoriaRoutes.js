const { Router } = require("express");
const categoriaController = require("../controllers/categoriaController");

const router = Router();

// Crear categoría
router.post("/", categoriaController.crearCategoria); 

// Obtener todas las categorías
router.get("/", categoriaController.obtenerCategorias); 

// Obtener categoría por ID
router.get("/:id", categoriaController.obtenerCategoriaPorId);

// Actualizar categoría
router.put("/:id", categoriaController.actualizarCategoria); 

// Eliminar categoría por ID
router.delete("/:id", categoriaController.eliminarCategoria); 

// Desactivar una categoría por ID
router.put('/desactivar/:id', categoriaController.desactivarCategoria);

module.exports = router;
