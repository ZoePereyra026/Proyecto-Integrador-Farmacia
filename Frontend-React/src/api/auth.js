import axios from "axios";

const API_URL = "https://proyecto-integrador-farmacia.onrender.com/api/usuarios";

export const registerUser = async (id, username, email, password) => {
  try {
    const res = await axios.post(`${API_URL}/registro`, {
      id,
      username,
      email,
      password
    });
    return { success: true, data: res.data };
  } catch (error) {
    const mensaje =
      error.response?.data?.error ||
      error.message ||
      "Error al registrar usuario";
    return { success: false, error: mensaje };
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    return { success: true, data: res.data };
  } catch (error) {
    const mensaje =
      error.response?.data?.error ||
      error.message ||
      "Error desconocido al iniciar sesión";
    return { success: false, error: mensaje };
  }
};
