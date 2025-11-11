const { Router } = require("express");
const {
  getAllUsers,
  registerUser,
  loginUser,
  getUsuarioActual
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.get("/", getAllUsers);
router.post("/registro", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getUsuarioActual);

module.exports = router;
