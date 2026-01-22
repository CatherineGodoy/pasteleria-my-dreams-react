import axios from "axios";

const URL_BASE = "https://backend-mydreams.onrender.com";

export const obtenerProductos = async () => {
  const response = await axios.get(URL_BASE + "/api/productos");

  return response.data;
};
