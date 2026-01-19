import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-mantenimiento">
      <div className="mantenimiento-card">
        <div className="icon-animado">👩‍🍳</div>
        <h2>¡Estamos horneando algo nuevo!</h2>
        <p>
          La sección de usuarios de <strong>Pastelería My Dreams</strong> está en proceso. 
          Pronto podrás registrarte para guardar tus pedidos favoritos.
        </p>
        <div className="barra-progreso">
          <div className="progreso-relleno"></div>
        </div>
        <p className="paciencia">¡Gracias por tu paciencia! 🧁</p>
      </div>
    </div>
  );
};

export default Login;