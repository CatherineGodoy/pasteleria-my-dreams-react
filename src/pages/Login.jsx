import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("userToken", "token_my_dreams_2026");
      alert("¡Bienvenida de nuevo!");
      navigate('/'); 
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <main className="main-content">
      {/* TUS NUEVAS FRASES ACTUALIZADAS */}
      <h1 className="titulo-principal">Pastelería My Dreams</h1>
      <p className="subtitulo-home">Bienvenido, accede para disfrutar lo mejor de nosotros</p>

      <div className="formulario-container">
        <p className="login-status-msg">Identifícate para continuar</p>

        {error && <div className="error-text" style={{ textAlign: 'center', marginBottom: '15px' }}>{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="usuario">Nombre de Usuario:</label>
            <input 
              type="text" 
              id="usuario"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Tu usuario"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <div className="password-wrapper">
              <input 
                type={mostrarPassword ? "text" : "password"} 
                id="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required 
              />
              <button 
                type="button" 
                className="btn-ver-password"
                onClick={() => setMostrarPassword(!mostrarPassword)}
              >
                {mostrarPassword ? "✕" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" className="boton">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;