import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  // Nuevo: Estado para manejar errores
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Limpiamos errores previos

    // VALIDACIÓN 1: Usuario sin espacios
    if (username.includes(' ')) {
      setError('El nombre de usuario no puede tener espacios.');
      return;
    }

    // VALIDACIÓN 2: Largo de contraseña
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Si pasa las validaciones, procedemos
    console.log("Datos validados, enviando a la API...", { username, password });
    alert("¡Validación exitosa! Conectando...");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Iniciar Sesión</h1>
        <p>Acceso administrativo My Dreams</p>
        
        {/* Mostramos el error si existe */}
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nombre de Usuario</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Ej: admin_pasteleria"
              required 
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <div className="password-wrapper">
              <input 
                type={mostrarPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required 
              />
              <button 
                type="button" 
                className="eye-button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
              >
                {mostrarPassword ? "✕" : "👁️"} 
              </button>
            </div>
          </div>

          <button type="submit" className="btn-login">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;