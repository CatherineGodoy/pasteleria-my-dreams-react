import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Delicias from "./pages/Delicias";
import Contacto from "./pages/Contacto";
import imgLogo from "./assets/img/logoPasteleria.png";

function App() {
  return (
    <div className="app-container"> {/* se agrega una clase contenedora */}
      
      <Header logo={imgLogo} />

      {/* La etiqueta main envuelve el contenido cambiante */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/delicias" element={<Delicias />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<div style={{padding: '50px', textAlign: 'center'}}>Próximamente: Login</div>} />
        </Routes>
      </main>

      <Footer />
      
    </div>
  );
}

export default App;