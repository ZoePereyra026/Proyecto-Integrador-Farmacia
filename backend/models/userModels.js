const { connUsuario } = require("../config/database");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  collection: "usuarios"
});

const Usuario = connUsuario.model("Usuario", userSchema);

module.exports = Usuario;
