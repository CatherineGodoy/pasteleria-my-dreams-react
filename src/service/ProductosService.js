import axios from "axios";

// Esta es la dirección del servidor del profesor
const URL_BASE = "https://backend-mydreams.onrender.com";

export const obtenerProductos = async () => {
  try {
    // Aquí es donde realmente se "llama" a la API
    const response = await axios.get(`${URL_BASE}/api/productos`);
    
    // Devolvemos solo los datos que nos interesan
    return response.data; 
  } catch (error) {
    console.error("Error al conectar con la API:", error);
    throw error;
  }
};