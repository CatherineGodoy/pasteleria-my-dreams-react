import axios from "axios";

const URL_BASE = "https://backend-mydreams.onrender.com";

export const loginUsuario = async (username, password) => {
  try {
    // 🚀 RUTA EXACTA SEGÚN EL PROFE:
    const response = await axios.post(`${URL_BASE}/api/auth/login`, {
      username,
      password
    });
    
    // El backend del profe devuelve el token directamente en la respuesta
    return response.data; 
  } catch (error) {
    console.error("Error en login:", error.response?.status, error.response?.data);
    throw error; 
  }
};