import React from "react";
import "../index.css"; // Para asegurar los estilos

const Footer = () => {
  return (
    <footer>
      <div className="contenido-footer">
        <p>&copy; 2026 Pastelería My Dreams – Todos los derechos reservados.</p>
        <p className="firma">
          Diseñado y desarrollado por <strong>Catherine Godoy</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
