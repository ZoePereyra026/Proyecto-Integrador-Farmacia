const { Router } = require("express");
const userController = require("../controllers/userController");
const { verificarToken } = require("../middleware/authMiddleware"); // ajustá ruta si tu archivo está en otra carpeta

const router = Router();

// Registro de nuevo usuario
router.post("/register", userController.registerUser);

// Inicio de sesión
router.post("/login", userController.loginUser);

// Obtener perfil del usuario autenticado
router.get("/me", verificarToken, userController.getMe);

module.exports = router;
