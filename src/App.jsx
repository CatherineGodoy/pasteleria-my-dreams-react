import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Delicias from "./pages/Delicias";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login"; // <--- NUEVO IMPORT
import './App.css';

// IMPORTANTE: Esta es la ruta exacta según tu carpeta assets/img
import imgLogo from "./assets/img/logoPasteleria.png"; 

function App() {
  return (
    <div className="app-container">
      {/* Contenedor del Logo Medallón */}
      <div className="logo-container">
        <img 
          src={imgLogo} 
          alt="Logo My Dreams" 
          className="logo-img" 
        />
      </div>

      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/delicias" element={<Delicias />} />
          <Route path="/contacto" element={<Contacto />} />
          {/* Ruta de Login limpia y profesional */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;