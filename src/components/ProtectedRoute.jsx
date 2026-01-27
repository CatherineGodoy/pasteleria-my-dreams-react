import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // ✅ CAMBIO: Ahora buscamos en sessionStorage para que sea coherente
  const token = sessionStorage.getItem("userToken") || sessionStorage.getItem("token");

  if (!token) {
    // Si no hay token, lo mandamos al login
    console.log("Acceso denegado: No se encontró token en sessionStorage");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;