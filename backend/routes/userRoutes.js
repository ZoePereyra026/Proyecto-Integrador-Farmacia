const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

// Registro de nuevo usuario
router.post("/register", userController.registerUser);

// Inicio de sesión
router.post("/login", userController.loginUser);

module.exports = router;
