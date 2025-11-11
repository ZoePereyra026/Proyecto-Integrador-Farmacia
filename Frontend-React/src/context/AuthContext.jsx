import { createContext, useState, useEffect } from "react";
import { registerUser, loginUser } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
      window.dispatchEvent(new Event("carritoActualizado")); 
    }
  }, []);

  const register = async (id, username, email, password) => {
    const res = await registerUser(id, username, email, password);
    if (res.success) {
      setUsuario(res.data.usuario);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
      window.dispatchEvent(new Event("carritoActualizado"));
    }
    return res;
  };

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    if (res.success) {
      setUsuario(res.data.usuario);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
      window.dispatchEvent(new Event("carritoActualizado"));
    }
    return res;
  };

  const logout = () => {
    const usuarioActual = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioActual) {
      localStorage.removeItem(`cart_usuario_${usuarioActual.id}`);
    }
    localStorage.removeItem("usuario");
    setUsuario(null);
    window.dispatchEvent(new Event("carritoActualizado"));
  };

  return (
    <AuthContext.Provider value={{ usuario, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
