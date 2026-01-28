import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../service/AuthService";
import "../App.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [campoError, setCampoError] = useState({ user: false, pass: false });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCampoError({ user: false, pass: false });

    if (!username.trim() || !password.trim()) {
      setError("Por favor, completa todos los campos.");
      setCampoError({
        user: !username.trim(),
        pass: !password.trim(),
      });
      return;
    }

    setLoading(true);

    try {
      const data = await loginUsuario(username, password);

      if (data.token) {
        sessionStorage.setItem("userToken", data.token);
        sessionStorage.setItem("userName", username);

        if (username.toLowerCase() === "admin") {
          navigate("/admin");
        } else {
          window.location.href = "/";
        }
      }
    } catch (err) {
      setCampoError({ user: true, pass: true });
      if (err.response && err.response.status === 401) {
        setError("Usuario o contraseña incorrectos.");
      } else {
        setError("Hubo un problema al conectar. Inténtalo de nuevo.");
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
          <div
            className="error-text"
            style={{ textAlign: "center", marginBottom: "15px" }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {" "}
          {/* noValidate quita los mensajes por defecto */}
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (campoError.user)
                  setCampoError({ ...campoError, user: false });
              }}
              placeholder="Ingresa tu usuario"
              className={campoError.user ? "input-error" : ""}
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (campoError.pass)
                  setCampoError({ ...campoError, pass: false });
              }}
              placeholder="Contraseña"
              className={campoError.pass ? "input-error" : ""}
            />
          </div>
          <button
            type="submit"
            className="boton-principal"
            style={{ width: "100%" }}
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
