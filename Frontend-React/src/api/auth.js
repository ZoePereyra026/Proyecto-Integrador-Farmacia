import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios`;

export const registerUser = async (id, username, email, password) => {
  try {
    const res = await axios.post(
      `${API_URL}/registro`,
      { id, username, email, password },
      { withCredentials: true } 
    );
    return { success: true, data: res.data };
  } catch (error) {
    if (error.message === "Network Error") {
      return {
        success: false,
        error: "Error. No se pudo conectar con el servidor."
      };
    }

    const mensaje =
      error.response?.data?.error ||
      error.message ||
      "Error al registrar usuario";
    return { success: false, error: mensaje };
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(
      `${API_URL}/login`,
      { email, password },
      { withCredentials: true } 
    );
    return { success: true, data: res.data };
  } catch (error) {
    if (error.message === "Network Error") {
      return {
        success: false,
        error: "Error. No se pudo conectar con el servidor."
      };
    }

    const mensaje =
      error.response?.data?.error ||
      error.message ||
      "Error desconocido al iniciar sesión";
    return { success: false, error: mensaje };
  }
};
