const Usuario = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Registro de usuario
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validación de campos individuales
  if (!username || !email || !password) {
    return res.status(400).json({ error: "username, email y password son obligatorios" });
  }

  if (role && !["user", "admin"].includes(role)) {
    return res.status(400).json({ error: "El rol debe ser 'user' o 'admin'" });
  }

  try {
    // Verificar si el correo ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ error: "Ya existe un usuario con ese correo electrónico" });
    }

    // Crear el nuevo usuario
    const nuevoUsuario = await Usuario.create({
      username,
      email,
      password,
      role: role || "user"
    });
    console.log("✅ Usuario guardado en MongoDB:", nuevoUsuario);

    // Enviar respuesta sin incluir la contraseña
    res.status(201).json({
      message: "Usuario registrado con éxito",
      usuario: {
        _id: nuevoUsuario._id,
        username: nuevoUsuario.username,
        email: nuevoUsuario.email,
        role: nuevoUsuario.role,
      },
    });
  } catch (error) {
    console.error("Error al registrar:", error);
    res.status(500).json({
      error: "Error al registrar usuario",
      detalle: error.message,
    });
  }
};

// Login de usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son obligatorios" });
  }

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario._id, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login exitoso",
      usuario: {
        _id: usuario._id,
        username: usuario.username,
        email: usuario.email,
        role: usuario.role
      },
      token
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      error: "Error en el login",
      detalle: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser
};
