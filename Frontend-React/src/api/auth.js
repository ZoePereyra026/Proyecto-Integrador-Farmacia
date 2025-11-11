import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios`;

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
    const { usuario, token } = res.data;

    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("token", token);

    return { success: true, data: usuario };
  } catch (error) {
    const mensaje =
      error.response?.data?.error ||
      error.message ||
      "Error desconocido al iniciar sesión";
    return { success: false, error: mensaje };
  }
};

export const getUsuarioActual = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const res = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch {
    return null;
  }
};
