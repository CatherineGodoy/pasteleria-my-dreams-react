import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../service/AuthService'; 
import '../App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);

    try {
      const data = await loginUsuario(username, password);

      if (data.token) {
        /** *CAMBIO CLAVE PARA SEGURIDAD:
         * Usamos 'sessionStorage' en lugar de 'localStorage'.
         * Esto hace que la sesión sea VOLÁTIL: si cierras la pestaña o el navegador,
         * los datos se borran automáticamente y el usuario deberá loguearse de nuevo.
         * Es el estándar para paneles de administración.
         */
        sessionStorage.setItem("userToken", data.token); 
        sessionStorage.setItem("userName", username);

        if (username.toLowerCase() === 'admin') {
          navigate('/admin'); 
        } else {
          window.location.href = "/"; 
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Usuario o contraseña incorrectos.');
      } else {
        setError('Hubo un problema al conectar. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-content">
      <h1 className="titulo-principal">Pastelería My Dreams</h1>
      <p className="subtitulo-home">Bienvenido al Sistema</p>

      <div className="formulario-container">
        {error && (
          <div className="error-message-box">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Contraseña"
              required
            />
          </div>

          <button 
            type="submit" 
            className="boton-principal boton-ancho" 
            disabled={loading}
          >
            {loading ? "Verificando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;