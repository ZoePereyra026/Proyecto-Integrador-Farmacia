const Usuario = require("../models/userModels");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("id username");
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

const registerUser = async (req, res) => {
  const { id, username, email, password } = req.body;

  if (!id || !username || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const emailExistente = await Usuario.findOne({ email });
    const idExistente = await Usuario.findOne({ id });

    if (emailExistente && idExistente) {
      return res.status(409).json({ error: "El correo y el ID ya están registrados" });
    } else if (emailExistente) {
      return res.status(409).json({ error: "El correo ya está registrado" });
    } else if (idExistente) {
      return res.status(409).json({ error: "El ID ya está registrado" });
    }

    const passwordEncriptada = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      id,
      username,
      email,
      password: passwordEncriptada
    });

    await nuevoUsuario.save();

    res.status(201).json({
      message: "Usuario registrado con éxito",
      usuario: {
        id: nuevoUsuario.id,
        username: nuevoUsuario.username
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno al registrar usuario" });
  }
};

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

    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      usuario: {
        id: usuario.id,
        username: usuario.username
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno en el inicio de sesión" });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser
};
